import { z } from "zod";

export const bookingStatus = ["pending", "confirmed", "rejected", "completed"] as const;

export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const insertAdminSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const insertBookingSchema = z.object({
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
  // z.enum expects a mutable array type; cast through unknown to satisfy TS
  status: z.enum(bookingStatus as unknown as [string, ...string[]]),
});

export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Valid phone number required").regex(/^[+\d\s()-]*$/, "Invalid phone format").optional(),
  message: z.string().min(1, "Message is required").max(2000, "Message too long"),
});

export const contactVerifySchema = insertContactSchema.pick({ name: true, email: true, phone: true, message: true });

export const contactConfirmSchema = insertContactSchema.extend({ code: z.string().min(4, "Verification code required") });

export const bookingVerifySchema = z.object({
  email: z.string().email("Valid email required"),
  name: z.string().min(1, "Name is required").max(50, "Name too long").optional(),
  phone: z.string().min(6, "Valid phone number required").regex(/^[+\d\s()-]*$/, "Invalid phone format").optional(),
});

export const bookingConfirmSchema = z.object({
  email: z.string().email("Valid email required"),
  code: z.string().min(4, "Verification code required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = { id: string; username: string; password: string };
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = { id: string; email: string; password: string; createdAt: Date };
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = {
  id: string;
  name: string;
  phone: string;
  email: string;
  passengers: number;
  pickupLocation: string;
  dropLocation: string;
  startDate: string;
  startTime: string;
  status: typeof bookingStatus[number];
  createdAt: Date;
};
export type BookingStatus = typeof bookingStatus[number];
export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactVerify = z.infer<typeof contactVerifySchema>;
export type ContactConfirm = z.infer<typeof contactConfirmSchema>;
export type BookingVerify = z.infer<typeof bookingVerifySchema>;
export type BookingConfirm = z.infer<typeof bookingConfirmSchema>;
