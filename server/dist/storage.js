"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
exports.initStorage = initStorage;
exports.setStorage = setStorage;
const crypto_1 = require("crypto");
const mongoose_1 = __importDefault(require("mongoose"));
const booking_1 = require("./models/booking");
const admin_1 = require("./models/admin");
// Helper: format booking sequence to ID string
function formatBookingId(seq) {
    return `MSC${String(seq).padStart(6, '0')}`;
}
// In-memory fallback storage
class MemStorage {
    constructor() {
        this.users = new Map();
        this.admins = new Map();
        this.bookings = new Map();
    }
    async getUser(id) {
        return this.users.get(id);
    }
    async getUserByUsername(username) {
        return Array.from(this.users.values()).find((user) => user.username === username);
    }
    async createUser(insertUser) {
        const id = (0, crypto_1.randomUUID)();
        const user = { ...insertUser, id };
        this.users.set(id, user);
        return user;
    }
    async createAdmin(insertAdmin) {
        const id = (0, crypto_1.randomUUID)();
        const admin = { ...insertAdmin, id, createdAt: new Date() };
        this.admins.set(id, admin);
        return admin;
    }
    async getAdminByEmail(email) {
        return Array.from(this.admins.values()).find((admin) => admin.email === email);
    }
    async createBooking(insertBooking) {
        // generate MSC series id (fallback in-memory sequence)
        let nextSeq = 1;
        // find max existing MSC id in memory
        const numericIds = Array.from(this.bookings.values())
            .map((b) => b.id)
            .filter((id) => typeof id === 'string' && id.startsWith('MSC'))
            .map((id) => parseInt(id.replace(/^MSC0*/, ''), 10))
            .filter((n) => !Number.isNaN(n));
        if (numericIds.length)
            nextSeq = Math.max(...numericIds) + 1;
        const id = formatBookingId(nextSeq);
        const booking = {
            ...insertBooking,
            id,
            status: "pending",
            createdAt: new Date(),
        };
        this.bookings.set(id, booking);
        return booking;
    }
    async getAllBookings() {
        return Array.from(this.bookings.values());
    }
    async getBookingById(id) {
        return this.bookings.get(id);
    }
    async updateBookingStatus(bookingId, status) {
        const booking = this.bookings.get(bookingId);
        if (booking) {
            booking.status = status;
            this.bookings.set(bookingId, booking);
        }
        return booking;
    }
}
// MongoDB-backed storage
class MongoStorage {
    async getUser(_id) {
        return undefined;
    }
    async getUserByUsername(_username) {
        return undefined;
    }
    async createUser(_user) {
        throw new Error('createUser not implemented for MongoStorage');
    }
    async createAdmin(insertAdmin) {
        const id = (0, crypto_1.randomUUID)();
        const doc = new admin_1.AdminModel({ id, ...insertAdmin });
        const saved = await doc.save();
        console.log('✅ Admin saved to MongoDB:', id);
        return {
            id: saved.id,
            email: saved.email,
            password: saved.password,
            createdAt: saved.createdAt,
        };
    }
    async getAdminByEmail(email) {
        const found = await admin_1.AdminModel.findOne({ email }).lean().exec();
        if (!found)
            return undefined;
        return {
            id: found.id,
            email: found.email,
            password: found.password,
            createdAt: found.createdAt,
        };
    }
    async createBooking(insertBooking) {
        // Determine next booking sequence atomically using a 'counters' collection.
        // If counter document does not exist, initialize it to the current max MSC booking ID in DB (so we don't collide with existing MSC ids).
        const counters = mongoose_1.default.connection.collection('counters');
        // Find highest MSC number in existing bookings (if any)
        let highestExisting = 0;
        try {
            const highest = await booking_1.BookingModel.find({ id: { $regex: /^MSC\d{6}$/ } })
                .sort({ id: -1 })
                .limit(1)
                .lean()
                .exec();
            if (highest && highest.length > 0) {
                const match = highest[0].id.match(/^MSC(\d{6})$/);
                if (match)
                    highestExisting = parseInt(match[1], 10);
            }
        }
        catch (err) {
            // Ignore errors here — we'll still attempt to use counters safely.
            console.warn('Failed to find highest existing MSC ID', err);
        }
        // Ensure the counter document exists. If it doesn't, seed it with highestExisting.
        const existingCounter = await counters.findOne({ _id: 'bookingSeq' });
        if (!existingCounter) {
            try {
                await counters.insertOne({ _id: 'bookingSeq', seq: highestExisting });
            }
            catch (e) {
                // Ignore duplicate key errors here — another process may have inserted concurrently.
            }
        }
        // Atomically increment the counter and fetch the new value.
        const res = await counters.findOneAndUpdate({ _id: 'bookingSeq' }, { $inc: { seq: 1 } }, { returnDocument: 'after' });
        let seq = 1;
        // Accept either driver response shapes: { value: { seq } } or { _id, seq }
        const returnedSeq = res && res.value && res.value.seq != null ? res.value.seq : (res && res.seq != null ? res.seq : undefined);
        if (returnedSeq != null) {
            const raw = returnedSeq;
            if (typeof raw === 'number')
                seq = raw;
            else if (typeof raw === 'string')
                seq = Number(raw);
            else if (raw && typeof raw.toNumber === 'function')
                seq = raw.toNumber();
            else
                seq = Number(raw);
            if (!Number.isFinite(seq) || seq < 1)
                seq = 1;
        }
        // Debug: log counter result (helps investigate strange cases in production)
        try {
            console.log('counter findOneAndUpdate result ->', JSON.stringify(res));
        }
        catch (e) { /* ignore */ }
        const id = formatBookingId(seq);
        console.log('🔢 Generating booking id ->', id, ' (seq=', seq, ')');
        if (process.env.NODE_ENV === 'development') {
            try {
                console.log('current counter doc ->', await counters.findOne({ _id: 'bookingSeq' }));
            }
            catch (_) { }
        }
        const doc = new booking_1.BookingModel({ id, ...insertBooking, status: 'pending' });
        // Save booking; if a duplicate key error happens (extremely rare), retry a few times.
        let saved;
        const maxAttempts = 3;
        let attempt = 0;
        while (attempt < maxAttempts) {
            attempt += 1;
            try {
                saved = await doc.save();
                break;
            }
            catch (err) {
                // If duplicate id (race), get a new seq and retry
                if (err && err.code === 11000 && attempt < maxAttempts) {
                    const r = await counters.findOneAndUpdate({ _id: 'bookingSeq' }, { $inc: { seq: 1 } }, { returnDocument: 'after' });
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
        if (!saved)
            throw new Error('Failed to save booking after retries');
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
        };
    }
    async getAllBookings() {
        const docs = await booking_1.BookingModel.find().sort({ createdAt: -1 }).lean().exec();
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
            status: d.status,
            createdAt: d.createdAt,
        }));
    }
    async getBookingById(id) {
        const d = await booking_1.BookingModel.findOne({ id }).lean().exec();
        if (!d)
            return undefined;
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
            status: d.status,
            createdAt: d.createdAt,
        };
    }
    async updateBookingStatus(bookingId, status) {
        const updated = await booking_1.BookingModel.findOneAndUpdate({ id: bookingId }, { status }, { new: true }).lean().exec();
        if (!updated)
            return undefined;
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
            status: updated.status,
            createdAt: updated.createdAt,
        };
    }
}
// Choose storage based on environment
let storageImpl = null;
async function initStorage() {
    if (storageImpl)
        return storageImpl;
    if (process.env.MONGODB_URI) {
        // Wait for Mongoose to be ready
        if (mongoose_1.default.connection.readyState === 0) {
            console.warn('⚠️ MongoDB not connected yet, falling back to MemStorage');
            storageImpl = new MemStorage();
            console.log('🗄️ Using MemStorage (in-memory)');
        }
        else {
            storageImpl = new MongoStorage();
            console.log('🗄️ Using MongoStorage (MongoDB persistence)');
            // Ensure booking sequence counter is seeded with the current maximum MSC booking number
            try {
                const counters = mongoose_1.default.connection.collection('counters');
                let highestExisting = 0;
                try {
                    const highest = await booking_1.BookingModel.find({ id: { $regex: /^MSC\d{6}$/ } }).sort({ id: -1 }).limit(1).lean().exec();
                    if (highest && highest.length > 0) {
                        const match = highest[0].id.match(/^MSC(\d{6})$/);
                        if (match)
                            highestExisting = parseInt(match[1], 10);
                    }
                }
                catch (err) {
                    console.warn('Failed to compute highestExisting booking during storage init', err);
                }
                // Use $max to ensure we don't overwrite a larger seq value
                await counters.updateOne({ _id: 'bookingSeq' }, { $max: { seq: highestExisting } }, { upsert: true });
            }
            catch (err) {
                console.warn('Failed to seed booking sequence counter:', err);
            }
        }
    }
    else {
        storageImpl = new MemStorage();
        console.log('🗄️ Using MemStorage (in-memory, data will be lost on restart)');
    }
    return storageImpl;
}
// This will be set by registerRoutes
async function setStorage(s) {
    exports.storage = s;
}
