import { CreateTransactionDto, UpdateTransactionDto } from '@/application/dtos/transaction.dto';
import { Transaction } from '@/domain/entities/transaction.entity';
import { TransactionsRepository } from '@/domain/repositories/transaction.repository';
import { TransactionModel } from '@/infra/models/transaction.model';
import { isValidObjectId } from 'mongoose';

export class MongoTransactionsRepository implements TransactionsRepository {
  async create(data: CreateTransactionDto): Promise<Transaction | null> {
    const user = await TransactionModel.create(data);
    if (!user) return null;
    return new Transaction(user.toObject());
  }

  async findOne(id: string): Promise<Transaction | null> {
    const isValidId = isValidObjectId(id);
    if (!isValidId) return null;
    const user = await TransactionModel.findById(id);
    if (!user) return null;
    return new Transaction(user.toObject());
  }

  async update(id: string, data: UpdateTransactionDto): Promise<Transaction | null> {
    const isValidId = isValidObjectId(id);
    if (!isValidId) return null;
    const user = await TransactionModel.findByIdAndUpdate(id, data, { new: true });
    if (!user) return null;
    return new Transaction(user.toObject());
  }

  async delete(id: string): Promise<boolean> {
    const isValidId = isValidObjectId(id);
    if (!isValidId) return false;
    const user = await TransactionModel.findByIdAndDelete(id);
    return !!user;
  }

  async findByUser(user: string): Promise<Transaction[]> {
    const isValidId = isValidObjectId(user);
    if (!isValidId) return [];
    const transactions = await TransactionModel.find({ user });
    return transactions.map(transaction => new Transaction(transaction.toObject()));
  }
}
