import { CreateTransactionDto } from '@/application/dtos/transaction.dto';
import { Transaction } from '../entities/transaction.entity';

export interface TransactionsRepository {
  create(data: CreateTransactionDto): Promise<Transaction | null>;
  findOne(id: string): Promise<Transaction | null>;
  update(id: string, data: CreateTransactionDto): Promise<Transaction | null>;
  delete(id: string): Promise<boolean>;
  findByUser(user: string): Promise<Transaction[]>;
}
