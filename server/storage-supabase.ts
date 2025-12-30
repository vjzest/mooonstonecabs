import { type User, type InsertUser, type Booking, type InsertBooking, type Admin, type InsertAdmin, type BookingStatus } from "./shared-schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { users, admins, bookings, counters } from "./db-schema";
import { eq } from "drizzle-orm";

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

// Supabase (PostgreSQL) Storage
class SupabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    return result as User | undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    return result as User | undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    await db.insert(users).values(user);
    return user;
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const id = randomUUID();
    const admin: Admin = { ...insertAdmin, id, createdAt: new Date() };
    await db.insert(admins).values(admin);
    return admin;
  }

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    const result = await db.query.admins.findFirst({
      where: eq(admins.email, email),
    });
    return result as Admin | undefined;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    // Get next booking sequence with error handling
    const counterId = "booking_counter";
    let counter;
    
    try {
      counter = await db.query.counters.findFirst({
        where: eq(counters.id, counterId),
      });
    } catch (err) {
      console.error("❌ Database error querying counters:", err instanceof Error ? err.message : err);
      // Fallback: generate simple sequential ID
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      const id = `MSC${String(timestamp).slice(-6)}${String(random).padStart(3, '0')}`;
      const booking: Booking = {
        ...insertBooking,
        id,
        status: "pending",
        createdAt: new Date(),
      };
      console.warn("⚠️  Using fallback booking ID:", id);
      return booking;
    }

    if (!counter) {
      // Initialize counter
      try {
        await db.insert(counters).values({
          id: counterId,
          name: "booking_sequence",
          value: 1,
        });
        counter = { id: counterId, name: "booking_sequence", value: 1, updatedAt: new Date() };
      } catch (err) {
        console.warn("⚠️  Could not initialize counter, using fallback");
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        const id = `MSC${String(timestamp).slice(-6)}${String(random).padStart(3, '0')}`;
        const booking: Booking = {
          ...insertBooking,
          id,
          status: "pending",
          createdAt: new Date(),
        };
        return booking;
      }
    } else {
      // Increment counter
      try {
        const newValue = (counter.value || 0) + 1;
        await db.update(counters)
          .set({ value: newValue, updatedAt: new Date() })
          .where(eq(counters.id, counterId));
        counter.value = newValue;
      } catch (err) {
        console.warn("⚠️  Could not update counter, using current value");
        // Continue with existing counter value
      }
    }

    const id = formatBookingId(counter.value || 1);
    try {
      const booking: Booking = {
        ...insertBooking,
        id,
        status: "pending",
        createdAt: new Date(),
      };
      await db.insert(bookings).values(booking);
      return booking;
    } catch (err) {
      console.error("❌ Failed to insert booking:", err instanceof Error ? err.message : err);
      throw err;
    }
  }

  async getAllBookings(): Promise<Booking[]> {
    const result = await db.query.bookings.findMany();
    return result as Booking[];
  }

  async getBookingById(id: string): Promise<Booking | undefined> {
    const result = await db.query.bookings.findFirst({
      where: eq(bookings.id, id),
    });
    return result as Booking | undefined;
  }

  async updateBookingStatus(bookingId: string, status: BookingStatus): Promise<Booking | undefined> {
    const result = await db.update(bookings)
      .set({ status })
      .where(eq(bookings.id, bookingId))
      .returning();

    return result[0] as Booking | undefined;
  }
}

// Initialize storage
export async function initStorage(): Promise<IStorage> {
  console.log("🗄️  Using Supabase (PostgreSQL) Storage");
  return new SupabaseStorage();
}
