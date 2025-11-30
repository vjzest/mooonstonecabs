import { z } from "zod";

// Client-safe schemas - no drizzle dependencies
// These are pure Zod schemas that can be used in the client build

export const bookingStatus = ["pending", "confirmed", "rejected", "completed"] as const;

// Booking schema for client-side validation
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

// Booking type for client use
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type BookingStatus = typeof bookingStatus[number];

// Booking type matching server-side structure
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
  status: BookingStatus;
  createdAt: string;
};

// Contact form schemas
export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Valid phone number required").regex(/^[+\d\s()-]*$/, "Invalid phone format").optional(),
  message: z.string().min(1, "Message is required").max(2000, "Message too long"),
});

export const contactVerifySchema = insertContactSchema.pick({ name: true, email: true, phone: true, message: true });
export const contactConfirmSchema = insertContactSchema.extend({
  code: z.string().min(4, "Verification code required"),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactVerify = z.infer<typeof contactVerifySchema>;
export type ContactConfirm = z.infer<typeof contactConfirmSchema>;

// Booking verification schemas
export const bookingVerifySchema = z.object({
  email: z.string().email("Valid email required"),
  name: z.string().min(1, "Name is required").max(50, "Name too long").optional(),
  phone: z.string().min(6, "Valid phone number required").regex(/^[+\d\s()-]*$/, "Invalid phone format").optional(),
});

export const bookingConfirmSchema = z.object({
  email: z.string().email('Valid email required'),
  code: z.string().min(4, 'Verification code required'),
});

export type BookingVerify = z.infer<typeof bookingVerifySchema>;
export type BookingConfirm = z.infer<typeof bookingConfirmSchema>;

