import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bookingStatus = ["pending", "confirmed", "rejected", "completed"] as const;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  passengers: integer("passengers").notNull(),
  pickupLocation: text("pickup_location").notNull(),
  dropLocation: text("drop_location").notNull(),
  startDate: text("start_date").notNull(),
  startTime: text("start_time").notNull(),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const admins = pgTable("admins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAdminSchema = createInsertSchema(admins).pick({
  email: true,
  password: true,
}).extend({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  status: true,
}).extend({
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  phone: z.string().min(10, "Valid phone number required").regex(/^\+?[\d\s-()]+$/, "Invalid phone format"),
  email: z.string().email("Valid email required"),
  passengers: z.number().int().positive("Must be at least 1 passenger"),
  pickupLocation: z.string().min(1, "Pickup location required"),
  dropLocation: z.string().min(1, "Drop location required"),
  startDate: z.string().min(1, "Start date required"),
  startTime: z.string().min(1, "Start time required"),
});

export const updateBookingStatusSchema = z.object({
  bookingId: z.string().min(1, "Booking ID required"),
  status: z.enum(bookingStatus),
});

// Contact form schema — accepts name, email, optional phone, and message
export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Valid phone number required").regex(/^[+\d\s()-]*$/, "Invalid phone format").optional(),
  message: z.string().min(1, "Message is required").max(2000, "Message too long"),
});

// Step-1: verify request – we accept the contact fields so we can keep them while verification happens
export const contactVerifySchema = insertContactSchema.pick({ name: true, email: true, phone: true, message: true });

// Step-2: confirm request – full contact payload with verification code
export const contactConfirmSchema = insertContactSchema.extend({
  code: z.string().min(4, "Verification code required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = typeof admins.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
export type BookingStatus = typeof bookingStatus[number];
export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactVerify = z.infer<typeof contactVerifySchema>;
export type ContactConfirm = z.infer<typeof contactConfirmSchema>;

// Booking verification schemas — used to verify email before creating booking
// For verifying an email before booking we accept only the email (and optionally name/phone if provided)
export const bookingVerifySchema = z.object({
  email: z.string().email("Valid email required"),
  name: z.string().min(1, "Name is required").max(50, "Name too long").optional(),
  phone: z.string().min(6, "Valid phone number required").regex(/^[+\d\s()-]*$/, "Invalid phone format").optional(),
});

// Confirm step only needs email + code (we'll use stored payload server-side to create booking)
export const bookingConfirmSchema = z.object({
  email: z.string().email('Valid email required'),
  code: z.string().min(4, 'Verification code required'),
});

export type BookingVerify = z.infer<typeof bookingVerifySchema>;
export type BookingConfirm = z.infer<typeof bookingConfirmSchema>;
