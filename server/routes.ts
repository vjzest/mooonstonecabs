import type { Express } from "express";
import { createServer, type Server } from "http";
import { insertBookingSchema, insertAdminSchema, updateBookingStatusSchema, insertContactSchema, contactVerifySchema, contactConfirmSchema, bookingVerifySchema, bookingConfirmSchema } from "./shared-schema";

import { z } from "zod";
import nodemailer from "nodemailer";
import { scryptSync, randomBytes } from "crypto";
import mongoose from 'mongoose';

// Password hashing helper
function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, hash: string): boolean {
  const [salt, key] = hash.split(":");
  const hashedBuffer = scryptSync(password, salt, 64);
  return key === hashedBuffer.toString("hex");
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Dynamically import storage so that dotenv and mongoose connection
  // have been initialized in `index.ts` before storage decides which
  // backend to use (Mongo vs in-memory).
  const { initStorage } = await import("./storage");
  const storage = await initStorage();
  // Configure nodemailer transporter using environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || 'noreply@moonstonecabs.com',
      pass: process.env.EMAIL_PASS || '',
    },
  });

  // Use the authenticated email as the default from address (reduces spam filtering)
  const defaultFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@moonstonecabs.com';

  // Initialize default admin if not exists
  const defaultAdmin = await storage.getAdminByEmail("admin@moonstonecabs.com");
  if (!defaultAdmin) {
    await storage.createAdmin({
      email: "admin@moonstonecabs.com",
      password: hashPassword("admin123"),
    });
  }

  // In-memory verification stores (shared): contact and booking
  const contactVerifications = new Map<string, { code: string; payload: any; expiresAt: number; attempts: number; verified?: boolean }>();
  const bookingVerifications = new Map<string, { code: string; payload: any; expiresAt: number; attempts: number; verified?: boolean }>();

  // Helper: detect database connectivity / TLS / topology errors so we can return clearer responses
  function isDbError(err: any) {
    if (!err) return false;
    const name = String(err.name || "");
    const message = String(err.message || "").toLowerCase();
    return name.toLowerCase().includes("mongo") || message.includes("topology") || message.includes("tls") || message.includes("ssl") || message.includes("serverselection");
  }

  // ============ ADMIN ROUTES ============

  // Admin Login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, error: "Email and password required" });
      }

      let admin;
      try {
        admin = await storage.getAdminByEmail(email);
      } catch (err) {
        console.error('Admin login error:', err);
        if (isDbError(err)) {
          return res.status(503).json({ success: false, error: 'Service unavailable — database connectivity problem. Please try again later.' });
        }
        throw err;
      }

      if (!admin || !verifyPassword(password, admin.password)) {
        return res.status(401).json({ success: false, error: "Invalid credentials" });
      }

      res.json({
        success: true,
        admin: { id: admin.id, email: admin.email },
        message: "Login successful",
      });
    } catch (error) {
      console.error("Admin login error:", error);
      res.status(500).json({ success: false, error: "Login failed" });
    }
  });

  // Get all bookings (admin dashboard)
  app.get("/api/admin/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      const stats = {
        total: bookings.length,
        pending: bookings.filter((b) => b.status === "pending").length,
        confirmed: bookings.filter((b) => b.status === "confirmed").length,
        rejected: bookings.filter((b) => b.status === "rejected").length,
        completed: bookings.filter((b) => b.status === "completed").length,
      };

      res.json({ success: true, bookings, stats });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      if (isDbError(error)) {
        return res.status(503).json({ success: false, error: "Database unavailable. Please try again later." });
      }
      res.status(500).json({ success: false, error: "Failed to fetch bookings" });
    }
  });

  // Update booking status
  app.put("/api/admin/bookings/:bookingId/status", async (req, res) => {
    try {
      const { bookingId } = req.params;
      const { status } = req.body;

      const validatedData = updateBookingStatusSchema.parse({ bookingId, status });
      const updatedBooking = await storage.updateBookingStatus(validatedData.bookingId, validatedData.status);

      if (!updatedBooking) {
        return res.status(404).json({ success: false, error: "Booking not found" });
      }

      // Send status update email to customer
      const statusMessages = {
        pending: "Your booking is pending confirmation. We'll contact you shortly.",
        confirmed: "Your booking has been confirmed! Driver will be assigned soon.",
        rejected: "Unfortunately, your booking has been rejected. Please contact us for more details.",
        completed: "Thank you for choosing Moonstone Cabs! Your ride has been completed.",
      };

      const emailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Space Grotesk', sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
            .header { background: #007bff; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 30px 0; }
            .status-badge { display: inline-block; padding: 10px 20px; background: ${
              validatedData.status === "confirmed"
                ? "#28a745"
                : validatedData.status === "rejected"
                  ? "#dc3545"
                  : validatedData.status === "completed"
                    ? "#20c997"
                    : "#ffc107"
            }; color: white; border-radius: 5px; font-weight: 600; margin: 20px 0; }
            .footer { text-align: center; padding: 20px 0; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>MOONSTONE CABS</h1>
              <p>Booking Status Update</p>
            </div>
            <div class="content">
              <h2>Hello ${updatedBooking.name},</h2>
              <div class="status-badge">${validatedData.status.toUpperCase()}</div>
              <p>${statusMessages[validatedData.status as keyof typeof statusMessages]}</p>
              <h3>Booking Details:</h3>
              <ul>
                <li><strong>Booking ID:</strong> ${updatedBooking.id}</li>
                <li><strong>Date:</strong> ${updatedBooking.startDate}</li>
                <li><strong>Time:</strong> ${updatedBooking.startTime}</li>
                <li><strong>From:</strong> ${updatedBooking.pickupLocation}</li>
                <li><strong>To:</strong> ${updatedBooking.dropLocation}</li>
              </ul>
              <p>For support, contact: <strong>+91-9990800718</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Moonstone Cabs Pvt. Ltd. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      try {
        await transporter.sendMail({
          from: `"Moonstone Cabs" <${defaultFrom}>`,
          to: updatedBooking.email,
          subject: `Booking Status Updated - ${updatedBooking.id}`,
          html: emailHTML,
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }

      res.json({ success: true, booking: updatedBooking, message: "Status updated successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: "Invalid status", details: error.errors });
      }
      console.error("Status update error:", error);
      res.status(500).json({ success: false, error: "Failed to update status" });
    }
  });

  // ============ BOOKING ROUTES ============
  app.post("/api/bookings", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertBookingSchema.parse(req.body);

      // Require prior email verification for this booking (email must have a verified entry)
      const key = validatedData.email.toLowerCase();
      const v = bookingVerifications.get(key);
      if (!v || !v.verified) {
        return res.status(403).json({ success: false, error: 'Email not verified. Please verify your email before submitting booking.' });
      }

      // Create booking in storage
      const booking = await storage.createBooking(validatedData);

      // consume verification entry (one-time use)
      bookingVerifications.delete(key);

      // Send confirmation email to customer
      const customerEmailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Space Grotesk', sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
            .header { background: #007bff; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 30px 0; }
            .booking-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
            .detail-label { font-weight: 600; color: #666; }
            .detail-value { color: #000; }
            .footer { text-align: center; padding: 20px 0; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>MOONSTONE CABS</h1>
              <p>Booking Confirmation</p>
            </div>
            <div class="content">
              <h2>Thank you for your booking!</h2>
              <p>Dear ${validatedData.name},</p>
              <p>Your taxi booking has been successfully received. We will contact you shortly to confirm the details.</p>
              
              <div class="booking-details">
                <h3>Booking Details:</h3>
                <div class="detail-row">
                  <span class="detail-label">Booking ID:</span>
                  <span class="detail-value">${booking.id}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Name:</span>
                  <span class="detail-value">${validatedData.name}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Phone:</span>
                  <span class="detail-value">${validatedData.phone}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value">${validatedData.email}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Passengers:</span>
                  <span class="detail-value">${validatedData.passengers}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Pickup Location:</span>
                  <span class="detail-value">${validatedData.pickupLocation}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Drop Location:</span>
                  <span class="detail-value">${validatedData.dropLocation}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Date & Time:</span>
                  <span class="detail-value">${validatedData.startDate} at ${validatedData.startTime}</span>
                </div>
              </div>
              
              <p><strong>What's Next?</strong></p>
              <ul>
                <li>Our team will review your booking</li>
                <li>You'll receive a confirmation call within 1 hour</li>
                <li>We'll arrange the best vehicle for your journey</li>
              </ul>
              
              <p>If you have any questions, please contact us:</p>
              <p>📞 +91-9990800718 | +91-9536575768</p>
              <p>📧 booking@moonstonecabs.com</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Moonstone Cabs Pvt. Ltd. All rights reserved.</p>
              <p>KH. NO. 45/18, Chhawla, Najafgarh, South West Delhi, New Delhi – 110043</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Send confirmation email to company
      const companyEmailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Space Grotesk', sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
            .header { background: #007bff; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 30px 0; }
            .booking-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
            .detail-label { font-weight: 600; color: #666; }
            .detail-value { color: #000; }
            .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚕 NEW BOOKING ALERT</h1>
            </div>
            <div class="content">
              <div class="alert">
                <strong>⚡ Action Required:</strong> New booking received. Please contact customer within 1 hour.
              </div>
              
              <div class="booking-details">
                <h3>Booking Details:</h3>
                <div class="detail-row">
                  <span class="detail-label">Booking ID:</span>
                  <span class="detail-value">${booking.id}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Customer Name:</span>
                  <span class="detail-value">${validatedData.name}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Phone:</span>
                  <span class="detail-value">${validatedData.phone}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value">${validatedData.email}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Passengers:</span>
                  <span class="detail-value">${validatedData.passengers}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Pickup:</span>
                  <span class="detail-value">${validatedData.pickupLocation}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Drop:</span>
                  <span class="detail-value">${validatedData.dropLocation}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Schedule:</span>
                  <span class="detail-value">${validatedData.startDate} at ${validatedData.startTime}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Booking Time:</span>
                  <span class="detail-value">${new Date().toLocaleString()}</span>
                </div>
              </div>
              
              <p><strong>Next Steps:</strong></p>
              <ol>
                <li>Call customer to confirm booking</li>
                <li>Assign appropriate vehicle</li>
                <li>Arrange driver for scheduled time</li>
                <li>Send final confirmation to customer</li>
              </ol>
            </div>
          </div>
        </body>
        </html>
      `;

      try {
        // Send email to customer
        await transporter.sendMail({
          from: `"Moonstone Cabs" <${defaultFrom}>`,
          to: validatedData.email,
          subject: `Booking Confirmation - ${booking.id}`,
          html: customerEmailHTML,
        });

        // Send email to company
        await transporter.sendMail({
          from: `"Moonstone Cabs Website" <${defaultFrom}>`,
          to: "booking@moonstonecabs.com, contact@moonstonecabs.com",
          subject: `🚕 New Booking: ${validatedData.name} - ${validatedData.startDate}`,
          html: companyEmailHTML,
        });

        console.log(`Booking ${booking.id} created and emails sent successfully`);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Continue even if email fails - booking is still created
      }

      res.status(201).json({
        success: true,
        booking,
        message: "Booking created successfully. Confirmation email sent!",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          error: "Validation failed",
          details: error.errors,
        });
      } else {
        console.error("Booking creation error:", error);
        res.status(500).json({
          success: false,
          error: "Failed to create booking. Please try again.",
        });
      }
    }
  });

  // Get all bookings (for admin/testing purposes)
  // ============ CONTACT / VERIFICATION ROUTES ============
  // contactVerifications already declared above (shared verification store)

  // Step 1: Verify — send a verification code to the user's email and keep submitted payload in-memory
  app.post('/api/contact/verify', async (req, res) => {
    try {
      const validated = contactVerifySchema.parse(req.body);

      // rate-limit by email
      const now = Date.now();
      const existing = contactVerifications.get(validated.email.toLowerCase());
      if (existing && existing.expiresAt > now && existing.attempts >= 5) {
        return res.status(429).json({ success: false, error: 'Too many attempts, please try later' });
      }

      // generate 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      // store verification (15 minutes expiry)
      contactVerifications.set(validated.email.toLowerCase(), {
        code,
        payload: validated,
        expiresAt: now + 1000 * 60 * 15,
        attempts: existing ? existing.attempts + 1 : 1,
        verified: false,
      });

      // send code to user
      await transporter.sendMail({
        from: `"Moonstone Cabs" <${defaultFrom}>`,
        to: validated.email,
        subject: 'Your verification code — Moonstone Cabs',
        html: `<p>Your verification code is <strong>${code}</strong>. It will expire in 15 minutes.</p>`,
      });

      // DEBUG: expose code in logs during development to make it easy to test
      console.log('🔐 booking verify code for', validated.email, ':', code);

      console.log('📨 Sent contact verification code to', validated.email);
      // In development or when DEBUG_EMAILS=true, include the code in the response to make testing easier
      const showCode = process.env.DEBUG_EMAILS === 'true' || app.get('env') === 'development';
      return res.status(200).json({ success: true, message: 'Verification code sent to email', code: showCode ? code : undefined });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: 'Invalid contact data', details: err.errors });
      }
      console.error('Contact verify error:', err);
      res.status(500).json({ success: false, error: 'Failed to send verification code' });
    }
  });

  // Step 2: Confirm — verify code then deliver message to admin and notify sender
  app.post('/api/contact/confirm', async (req, res) => {
    try {
      const validated = contactConfirmSchema.parse(req.body);
      const key = validated.email.toLowerCase();
      const stored = contactVerifications.get(key);
      const now = Date.now();

      if (!stored || stored.expiresAt < now) {
        return res.status(400).json({ success: false, error: 'Verification code expired or not requested' });
      }

      if (stored.code !== validated.code) {
        return res.status(400).json({ success: false, error: 'Invalid verification code' });
      }

      // Send admin notification
      const adminRecipients = process.env.CONTACT_RECIPIENTS || 'contact@moonstonecabs.com, booking@moonstonecabs.com';
      const emailHtml = `
        <h2>New contact request (verified)</h2>
        <p><strong>Name:</strong> ${validated.name}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        <p><strong>Phone:</strong> ${validated.phone ?? '(not provided)'}</p>
        <h3>Message</h3>
        <div style="white-space:pre-wrap;">${validated.message}</div>
        <hr />
        <p>Received: ${new Date().toISOString()}</p>
      `;

      await transporter.sendMail({
        from: `"Moonstone Cabs Website" <${defaultFrom}>`,
        to: adminRecipients,
        subject: `🚀 Verified Contact: ${validated.name}`,
        html: emailHtml,
      });

      // confirmation to sender
      try {
        await transporter.sendMail({
          from: `"Moonstone Cabs" <${defaultFrom}>`,
          to: validated.email,
          subject: 'We received your message — Moonstone Cabs',
          html: `
            <p>Hi ${validated.name},</p>
            <p>Thanks for verifying your email — we've received your message and our team will reach out shortly.</p>
            <hr />
            <div style="white-space:pre-wrap;">${validated.message}</div>
            <p style="margin-top:8px">Regards,<br/>Moonstone Cabs</p>
          `,
        });
      } catch (err) {
        console.error('Failed to send confirmation email to user:', err);
      }

      // remove verification entry
      contactVerifications.delete(key);

      console.log('✅ Contact confirmed and delivered for', validated.email);
      res.status(201).json({ success: true, message: 'Contact request submitted and delivered.' });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: 'Invalid contact data', details: err.errors });
      }
      console.error('Contact confirm error:', err);
      res.status(500).json({ success: false, error: 'Failed to deliver contact message' });
    }
  });
  
  // ============ BOOKING VERIFICATION ============
  // bookingVerifications store is declared earlier as shared verification store

  // Step 1: Verify booking — send a verification code to the provided email and store booking payload
  app.post('/api/bookings/verify', async (req, res) => {
    try {
      const validated = bookingVerifySchema.parse(req.body);
      const now = Date.now();
      const key = validated.email.toLowerCase();
      const existing = bookingVerifications.get(key);
      if (existing && existing.expiresAt > now && existing.attempts >= 5) {
        return res.status(429).json({ success: false, error: 'Too many attempts, try later' });
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString();

      bookingVerifications.set(key, {
        code,
        payload: validated,
        expiresAt: now + 1000 * 60 * 15,
        attempts: existing ? existing.attempts + 1 : 1,
        verified: false,
      });

      await transporter.sendMail({
        from: `"Moonstone Cabs" <${defaultFrom}>`,
        to: validated.email,
        subject: 'Your booking verification code — Moonstone Cabs',
        html: `<p>Your verification code for booking is <strong>${code}</strong>. It expires in 15 minutes.</p>`,
      });

      console.log('📨 Sent booking verification code to', validated.email);
      const showCode = process.env.DEBUG_EMAILS === 'true' || process.env.DEV_EXPOSE_CODES === '1' || app.get('env') === 'development';
      res.json({ success: true, message: 'Verification code sent to email', code: showCode ? code : undefined });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ success: false, error: 'Invalid booking data', details: err.errors });
      }
      console.error('Booking verify error:', err);
      res.status(500).json({ success: false, error: 'Failed to send verification code' });
    }
  });

  // Step 2: Confirm booking — validate code then create booking and send emails
  app.post('/api/bookings/confirm', async (req, res) => {
    try {
      // Log incoming confirm payload for debugging
      console.log('🔎 booking/confirm payload:', JSON.stringify(req.body));

      // Only validate email + code here — the stored payload holds booking details
      const validated = bookingConfirmSchema.parse(req.body);
      const key = validated.email.toLowerCase();
      const stored = bookingVerifications.get(key);
      const now = Date.now();

      if (!stored || stored.expiresAt < now) {
        return res.status(400).json({ success: false, error: 'Verification code expired or not requested' });
      }

      if (stored.code !== validated.code) {
        return res.status(400).json({ success: false, error: 'Invalid verification code' });
      }

      // mark this verification as verified so POST /api/bookings may create the booking
      bookingVerifications.set(key, { ...stored, verified: true });

      console.log(`✅ booking verify OK for ${key}`);

      // verification successful; booking can now be submitted by client

      res.status(200).json({ success: true, message: 'Email verified — you may submit the booking now.' });
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.error('booking/confirm zod error:', err.errors);
        return res.status(400).json({ success: false, error: 'Invalid booking data', details: err.errors });
      }
      console.error('Booking confirm error:', err);
      res.status(500).json({ success: false, error: 'Failed to confirm booking' });
    }
  });
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json({ success: true, bookings });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch bookings",
      });
    }
  });

  // Debug endpoint: show which storage backend is active and mongoose state
  app.get('/api/debug/storage', (_req, res) => {
    try {
      const storageType = storage?.constructor?.name || 'unknown';
      const mongooseState = (mongoose && mongoose.connection && typeof mongoose.connection.readyState === 'number') ? mongoose.connection.readyState : 'unknown';
      res.json({ success: true, storageType, mongooseState });
    } catch (err) {
      console.error('Debug storage endpoint error:', err);
      res.status(500).json({ success: false, error: 'Failed to inspect storage' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
