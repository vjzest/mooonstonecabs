import { type User, type InsertUser, type Booking, type InsertBooking, type Admin, type InsertAdmin, type BookingStatus } from "./shared-schema";
import { randomUUID } from "crypto";
import mongoose from "mongoose";
import { BookingModel } from "./models/booking";
import { AdminModel } from "./models/admin";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  getAdminByEmail(email: string): Promise<Admin | undefined>;
  
  createBooking(booking: InsertBooking): Promise<Booking>;
  getAllBookings(): Promise<Booking[]>;
  getBookingById(id: string): Promise<Booking | undefined>;
  updateBookingStatus(bookingId: string, status: BookingStatus): Promise<Booking | undefined>;
}

// Helper: format booking sequence to ID string
function formatBookingId(seq: number) {
  return `MSC${String(seq).padStart(6, '0')}`;
}

// In-memory fallback storage
class MemStorage implements IStorage {
  private users: Map<string, User>;
  private admins: Map<string, Admin>;
  private bookings: Map<string, Booking>;

  constructor() {
    this.users = new Map();
    this.admins = new Map();
    this.bookings = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const id = randomUUID();
    const admin: Admin = { ...insertAdmin, id, createdAt: new Date() };
    this.admins.set(id, admin);
    return admin;
  }

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find((admin) => admin.email === email);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    // generate MSC series id (fallback in-memory sequence)
    let nextSeq = 1;
    // find max existing MSC id in memory
    const numericIds = Array.from(this.bookings.values())
      .map((b) => b.id)
      .filter((id) => typeof id === 'string' && id.startsWith('MSC'))
      .map((id) => parseInt(id.replace(/^MSC0*/, ''), 10))
      .filter((n) => !Number.isNaN(n));
    if (numericIds.length) nextSeq = Math.max(...numericIds) + 1;
    const id = formatBookingId(nextSeq);
    const booking: Booking = {
      ...insertBooking,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingById(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async updateBookingStatus(bookingId: string, status: BookingStatus): Promise<Booking | undefined> {
    const booking = this.bookings.get(bookingId);
    if (booking) {
      booking.status = status;
      this.bookings.set(bookingId, booking);
    }
    return booking;
  }
}

// MongoDB-backed storage
class MongoStorage implements IStorage {
  async getUser(_id: string): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(_username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(_user: InsertUser): Promise<User> {
    throw new Error('createUser not implemented for MongoStorage');
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const id = randomUUID();
    const doc = new AdminModel({ id, ...insertAdmin });
    const saved = await doc.save();
    console.log('✅ Admin saved to MongoDB:', id);
    return {
      id: saved.id,
      email: saved.email,
      password: saved.password,
      createdAt: saved.createdAt,
    } as Admin;
  }

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    const found = await AdminModel.findOne({ email }).lean().exec();
    if (!found) return undefined;
    return {
      id: found.id,
      email: found.email,
      password: found.password,
      createdAt: found.createdAt,
    } as Admin;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    // Determine next booking sequence atomically using a 'counters' collection.
    // If counter document does not exist, initialize it to the current max MSC booking ID in DB (so we don't collide with existing MSC ids).
    const counters = mongoose.connection.collection('counters');

    // Find highest MSC number in existing bookings (if any)
    let highestExisting = 0;
    try {
      const highest = await BookingModel.find({ id: { $regex: /^MSC\d{6}$/ } })
        .sort({ id: -1 })
        .limit(1)
        .lean()
        .exec();
      if (highest && highest.length > 0) {
        const match = highest[0].id.match(/^MSC(\d{6})$/);
        if (match) highestExisting = parseInt(match[1], 10);
      }
    } catch (err) {
      // Ignore errors here — we'll still attempt to use counters safely.
      console.warn('Failed to find highest existing MSC ID', err);
    }

      // Ensure the counter document exists. If it doesn't, seed it with highestExisting.
      const existingCounter = await (counters as any).findOne({ _id: 'bookingSeq' });
      if (!existingCounter) {
        try {
          await (counters as any).insertOne({ _id: 'bookingSeq', seq: highestExisting });
        } catch (e) {
          // Ignore duplicate key errors here — another process may have inserted concurrently.
        }
      }

      // Atomically increment the counter and fetch the new value.
      const res = await (counters as any).findOneAndUpdate(
        { _id: 'bookingSeq' },
        { $inc: { seq: 1 } },
        { returnDocument: 'after' },
      );

      let seq = 1;
      // Accept either driver response shapes: { value: { seq } } or { _id, seq }
      const returnedSeq = res && res.value && res.value.seq != null ? res.value.seq : (res && res.seq != null ? res.seq : undefined);
      if (returnedSeq != null) {
        const raw = returnedSeq as any;
        if (typeof raw === 'number') seq = raw;
        else if (typeof raw === 'string') seq = Number(raw);
        else if (raw && typeof raw.toNumber === 'function') seq = raw.toNumber();
        else seq = Number(raw);
        if (!Number.isFinite(seq) || seq < 1) seq = 1;
      }

      // Debug: log counter result (helps investigate strange cases in production)
      try { console.log('counter findOneAndUpdate result ->', JSON.stringify(res)); } catch (e) { /* ignore */ }
    const id = formatBookingId(seq);
    console.log('🔢 Generating booking id ->', id, ' (seq=', seq, ')');
    if (process.env.NODE_ENV === 'development') {
      try { console.log('current counter doc ->', await (counters as any).findOne({ _id: 'bookingSeq' })); } catch (_) { }
    }
    const doc = new BookingModel({ id, ...insertBooking, status: 'pending' });
    // Save booking; if a duplicate key error happens (extremely rare), retry a few times.
    let saved;
    const maxAttempts = 3;
    let attempt = 0;
    while (attempt < maxAttempts) {
      attempt += 1;
      try {
        saved = await doc.save();
        break;
      } catch (err: any) {
        // If duplicate id (race), get a new seq and retry
        if (err && err.code === 11000 && attempt < maxAttempts) {
          const r = await (counters as any).findOneAndUpdate({ _id: 'bookingSeq' }, { $inc: { seq: 1 } }, { returnDocument: 'after' });
          const returned = r && r.value && r.value.seq != null ? r.value.seq : (r && r.seq != null ? r.seq : undefined);
          if (returned != null) {
            const newSeq = Number(returned);
            doc.id = formatBookingId(newSeq);
            console.warn('Duplicate ID conflict, retrying with new seq', newSeq);
            continue;
          }
        }
        throw err;
      }
    }
    if (!saved) throw new Error('Failed to save booking after retries');
    console.log('✅ Booking saved to MongoDB:', id);
    return {
      id: saved.id,
      name: saved.name,
      phone: saved.phone,
      email: saved.email,
      passengers: saved.passengers,
      pickupLocation: saved.pickupLocation,
      dropLocation: saved.dropLocation,
      startDate: saved.startDate,
      startTime: saved.startTime,
      status: saved.status,
      createdAt: saved.createdAt,
    } as Booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    const docs = await BookingModel.find().sort({ createdAt: -1 }).lean().exec();
    return docs.map((d) => ({
      id: d.id,
      name: d.name,
      phone: d.phone,
      email: d.email,
      passengers: d.passengers,
      pickupLocation: d.pickupLocation,
      dropLocation: d.dropLocation,
      startDate: d.startDate,
      startTime: d.startTime,
      status: d.status as BookingStatus,
      createdAt: d.createdAt,
    } as Booking));
  }

  async getBookingById(id: string): Promise<Booking | undefined> {
    const d = await BookingModel.findOne({ id }).lean().exec();
    if (!d) return undefined;
    return {
      id: d.id,
      name: d.name,
      phone: d.phone,
      email: d.email,
      passengers: d.passengers,
      pickupLocation: d.pickupLocation,
      dropLocation: d.dropLocation,
      startDate: d.startDate,
      startTime: d.startTime,
      status: d.status as BookingStatus,
      createdAt: d.createdAt,
    } as Booking;
  }

  async updateBookingStatus(bookingId: string, status: BookingStatus): Promise<Booking | undefined> {
    const updated = await BookingModel.findOneAndUpdate({ id: bookingId }, { status }, { new: true }).lean().exec();
    if (!updated) return undefined;
    console.log('✅ Booking status updated in MongoDB:', bookingId, '->', status);
    return {
      id: updated.id,
      name: updated.name,
      phone: updated.phone,
      email: updated.email,
      passengers: updated.passengers,
      pickupLocation: updated.pickupLocation,
      dropLocation: updated.dropLocation,
      startDate: updated.startDate,
      startTime: updated.startTime,
      status: updated.status as BookingStatus,
      createdAt: updated.createdAt,
    } as Booking;
  }
}

// Choose storage based on environment
let storageImpl: IStorage | null = null;

export async function initStorage(): Promise<IStorage> {
  if (storageImpl) return storageImpl;
  
  if (process.env.MONGODB_URI) {
    // Wait for Mongoose to be ready
    if (mongoose.connection.readyState === 0) {
      console.warn('⚠️ MongoDB not connected yet, falling back to MemStorage');
      storageImpl = new MemStorage();
      console.log('🗄️ Using MemStorage (in-memory)');
    } else {
        storageImpl = new MongoStorage();
        console.log('🗄️ Using MongoStorage (MongoDB persistence)');

        // Ensure booking sequence counter is seeded with the current maximum MSC booking number
        try {
          const counters = mongoose.connection.collection('counters');
          let highestExisting = 0;
          try {
            const highest = await BookingModel.find({ id: { $regex: /^MSC\d{6}$/ } }).sort({ id: -1 }).limit(1).lean().exec();
            if (highest && highest.length > 0) {
              const match = highest[0].id.match(/^MSC(\d{6})$/);
              if (match) highestExisting = parseInt(match[1], 10);
            }
          } catch (err) {
            console.warn('Failed to compute highestExisting booking during storage init', err);
          }

          // Use $max to ensure we don't overwrite a larger seq value
          await (counters as any).updateOne(
            { _id: 'bookingSeq' },
            { $max: { seq: highestExisting } },
            { upsert: true }
          );
        } catch (err) {
          console.warn('Failed to seed booking sequence counter:', err);
        }
    }
  } else {
    storageImpl = new MemStorage();
    console.log('🗄️ Using MemStorage (in-memory, data will be lost on restart)');
  }
  
  return storageImpl;
}

// For backward compatibility - lazy initialization
export let storage: IStorage;

// This will be set by registerRoutes
export async function setStorage(s: IStorage) {
  storage = s;
}
