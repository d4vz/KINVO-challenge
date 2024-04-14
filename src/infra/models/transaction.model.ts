import { Transaction } from '@/domain/entities/transaction.entity';
import mongoose, { Document } from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const TransactionModel = mongoose.model<Transaction & Document>('Transaction', transactionSchema);
