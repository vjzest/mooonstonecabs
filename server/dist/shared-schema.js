"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingConfirmSchema = exports.bookingVerifySchema = exports.contactConfirmSchema = exports.contactVerifySchema = exports.insertContactSchema = exports.updateBookingStatusSchema = exports.insertBookingSchema = exports.insertAdminSchema = exports.insertUserSchema = exports.bookingStatus = void 0;
const zod_1 = require("zod");
exports.bookingStatus = ["pending", "confirmed", "rejected", "completed"];
exports.insertUserSchema = zod_1.z.object({
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
});
exports.insertAdminSchema = zod_1.z.object({
    email: zod_1.z.string().email("Valid email required"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
exports.insertBookingSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
    phone: zod_1.z.string().min(10, "Valid phone number required").regex(/^\+?[\d\s-()]+$/, "Invalid phone format"),
    email: zod_1.z.string().email("Valid email required"),
    passengers: zod_1.z.number().int().positive("Must be at least 1 passenger"),
    pickupLocation: zod_1.z.string().min(1, "Pickup location required"),
    dropLocation: zod_1.z.string().min(1, "Drop location required"),
    startDate: zod_1.z.string().min(1, "Start date required"),
    startTime: zod_1.z.string().min(1, "Start time required"),
});
exports.updateBookingStatusSchema = zod_1.z.object({
    bookingId: zod_1.z.string().min(1, "Booking ID required"),
    // z.enum expects a mutable array type; cast through unknown to satisfy TS
    status: zod_1.z.enum(exports.bookingStatus),
});
exports.insertContactSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").max(100, "Name too long"),
    email: zod_1.z.string().email("Valid email required"),
    phone: zod_1.z.string().min(6, "Valid phone number required").regex(/^[+\d\s()-]*$/, "Invalid phone format").optional(),
    message: zod_1.z.string().min(1, "Message is required").max(2000, "Message too long"),
});
exports.contactVerifySchema = exports.insertContactSchema.pick({ name: true, email: true, phone: true, message: true });
exports.contactConfirmSchema = exports.insertContactSchema.extend({ code: zod_1.z.string().min(4, "Verification code required") });
exports.bookingVerifySchema = zod_1.z.object({
    email: zod_1.z.string().email("Valid email required"),
    name: zod_1.z.string().min(1, "Name is required").max(50, "Name too long").optional(),
    phone: zod_1.z.string().min(6, "Valid phone number required").regex(/^[+\d\s()-]*$/, "Invalid phone format").optional(),
});
exports.bookingConfirmSchema = zod_1.z.object({
    email: zod_1.z.string().email("Valid email required"),
    code: zod_1.z.string().min(4, "Verification code required"),
});
