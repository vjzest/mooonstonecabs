import { type User, type InsertUser, type Booking, type InsertBooking, type Admin, type InsertAdmin, type BookingStatus } from "./shared-schema";
import { randomUUID } from "crypto";

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

// In-memory fallback storage (for development without DB)
class MemStorage implements IStorage {
  private users: Map<string, User>;
  private admins: Map<string, Admin>;
  private bookings: Map<string, Booking>;
  private bookingSeq: number;

  constructor() {
    this.users = new Map();
    this.admins = new Map();
    this.bookings = new Map();
    this.bookingSeq = 1;
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
    const id = formatBookingId(this.bookingSeq++);
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

// Initialize storage
export async function initStorage(): Promise<IStorage> {
  // Use Supabase if DATABASE_URL is provided
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('supabase')) {
    try {
      const { initStorage: initSupabaseStorage } = await import('./storage-supabase');
      return await initSupabaseStorage();
    } catch (error) {
      console.warn("⚠️  Failed to initialize Supabase storage, falling back to in-memory:", error);
      console.log("💾 Using In-Memory Storage (dev mode)");
      return new MemStorage();
    }
  }

  // Fallback to in-memory storage
  console.log("💾 Using In-Memory Storage (dev mode)");
  return new MemStorage();
}
