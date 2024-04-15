import { TransactionType } from '@/domain/entities/transaction.entity';
import { z } from 'zod';

export const createTransactionDto = z.object({
  type: z.nativeEnum(TransactionType),
  amount: z.number(),
  date: z.coerce.date(),
  description: z.string(),
  user: z.string().optional(),
});

export type CreateTransactionDto = z.infer<typeof createTransactionDto>;

export const updateTransactionDto = z.object({
  type: z.nativeEnum(TransactionType).optional(),
  amount: z.number().optional(),
  date: z.date().optional(),
  description: z.string().optional(),
});

export type UpdateTransactionDto = z.infer<typeof updateTransactionDto>;
