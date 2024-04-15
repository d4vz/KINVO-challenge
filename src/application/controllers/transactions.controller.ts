import { MongoTransactionsRepository } from '@/infra/repositories/mongo/mongo-transactions.repository';
import { MongoUsersRepository } from '@/infra/repositories/mongo/mongo-users-repository';
import { asyncHandler } from '@/utils/async-handler';
import { UserRequest } from '../interfaces/user-request.interface';
import { CreateTransactionUsecase } from '../usecases/transactions/create-transaction.usecase';

const transactionsRepository = new MongoTransactionsRepository();
const usersRepository = new MongoUsersRepository();

export class TransactionsController {
  private createTransactionUsecase = new CreateTransactionUsecase(transactionsRepository, usersRepository);

  // public findTransactions = asyncHandler(async (req, res) => {});
  // public findTransactionById = asyncHandler(async (req, res) => {});
  // public findTransactionsByUser = asyncHandler(async (req, res) => {});

  public createTransaction = asyncHandler(async (req: UserRequest, res) => {
    const transaction = await this.createTransactionUsecase.execute(req.body, req.user._id);
    res.status(201).json({ data: transaction, message: 'Transaction created' });
  });

  // public updateTransaction = asyncHandler(async (req, res) => {});
  // public deleteTransaction = asyncHandler(async (req, res) => {});
}
