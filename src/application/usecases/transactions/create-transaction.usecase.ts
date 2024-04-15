import { CreateTransactionDto } from '@/application/dtos/transaction.dto';
import { Transaction } from '@/domain/entities/transaction.entity';
import { TransactionsRepository } from '@/domain/repositories/transaction.repository';
import { UsersRepository } from '@/domain/repositories/users.repository';
import { HttpException } from '@/infra/exceptions/httpException';

export class CreateTransactionUsecase {
  constructor(private readonly transactionsRepository: TransactionsRepository, private readonly usersRepository: UsersRepository) {}

  async execute(data: CreateTransactionDto, userId: string): Promise<Transaction | null> {
    const user = data?.user || userId;
    const userExists = await this.usersRepository.findOne(user);

    if (!userExists) {
      throw new HttpException(404, 'User not found');
    }

    if (data?.amount < 0) {
      throw new HttpException(400, 'Amount must be positive');
    }

    const transaction = await this.transactionsRepository.create({ ...data, user });

    return transaction;
  }
}
