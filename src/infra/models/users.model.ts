import { User } from '@/domain/entities/user.entity';
import mongoose, { Document, model } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export const UserModel = model<User & Document>('User', userSchema);
