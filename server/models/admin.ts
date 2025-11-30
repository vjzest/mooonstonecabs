import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdmin extends Document {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
}

const adminSchema = new Schema<IAdmin>(
  {
    id: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export const AdminModel: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>('Admin', adminSchema);
