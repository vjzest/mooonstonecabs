import mongoose from 'mongoose';

const CounterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, required: true, default: 0 },
});

export const CounterModel = mongoose.model('Counter', CounterSchema);
import mongoose, { Schema, Model, Document } from 'mongoose';

export interface ICounter extends Document {
  _id: string;
  seq: number;
}

const counterSchema = new Schema<ICounter>({
  _id: { type: String },
  seq: { type: Number, default: 0 },
});

export const CounterModel: Model<ICounter> = mongoose.models.Counter || mongoose.model<ICounter>('Counter', counterSchema);
