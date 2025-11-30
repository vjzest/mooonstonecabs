import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  id: string;
  name: string;
  phone: string;
  email: string;
  passengers: number;
  pickupLocation: string;
  dropLocation: string;
  startDate: string;
  startTime: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },

    passengers: { type: Number, required: true },
    pickupLocation: { type: String, required: true },
    dropLocation: { type: String, required: true },

    startDate: { type: String, required: true },
    startTime: { type: String, required: true },

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "confirmed", "rejected", "completed"],
    },
  },
  {
    timestamps: true, // ✔ Auto createdAt & updatedAt
  }
);

export const BookingModel: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);
