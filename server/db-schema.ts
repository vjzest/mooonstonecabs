import { pgTable, text, varchar, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";

// Enums
export const bookingStatusEnum = pgEnum("booking_status", ["pending", "confirmed", "rejected", "completed"]);

// Users table
export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Admins table
export const admins = pgTable("admins", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: varchar("id", { length: 10 }).primaryKey(), // MSC000001 format
  name: varchar("name", { length: 50 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  passengers: integer("passengers").notNull(),
  pickupLocation: varchar("pickup_location", { length: 255 }).notNull(),
  dropLocation: varchar("drop_location", { length: 255 }).notNull(),
  startDate: varchar("start_date", { length: 50 }).notNull(),
  startTime: varchar("start_time", { length: 50 }).notNull(),
  status: bookingStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Counters table (for booking sequence)
export const counters = pgTable("counters", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  value: integer("value").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});
