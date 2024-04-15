
import { authMiddleware } from '@/infra/middlewares/auth.middleware';
import { validationMiddleware } from '@/infra/middlewares/validation.middleware';
import { Router } from 'express';
import { TransactionsController } from '../controllers/transactions.controller';
import { createTransactionDto } from '../dtos/transaction.dto';
import { Routes } from '../interfaces/routes.interface';

export class TransactionsRoute implements Routes {
  public path = '/transactions';
  public router = Router();
  public controller = new TransactionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(authMiddleware);
    this.router.post(
      this.path,
      validationMiddleware({
        body: createTransactionDto,
      }),
      this.controller.createTransaction,
    );
  }
}
