import { App } from '@/app';
import { CreateTransactionDto } from '@/application/dtos/transaction.dto';
import { AuthRoute } from '@/application/routes/auth-route';
import { TransactionsRoute } from '@/application/routes/transaction.route';
import { TransactionType } from '@/domain/entities/transaction.entity';
import { authAgent } from '@/test-utils';
import { SuperAgentTest } from 'supertest';

describe('Transactions Route', () => {
  let createdTransactionId: string;
  let app: App;
  let agent: SuperAgentTest;

  beforeAll(async () => {
    app = new App([new AuthRoute(), new TransactionsRoute()]);
    agent = await authAgent(app.getServer());
  });

  describe('POST /transactions', () => {
    const transaction: CreateTransactionDto = {
      amount: 100,
      date: new Date(),
      description: 'Test transaction',
      type: TransactionType.INCOME,
    };

    it('should return 201 and the created transaction', async () => {
      const response = await agent.post('/transactions').send(transaction);
      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data.amount).toBe(transaction.amount);
      createdTransactionId = response.body.data._id;
    });

    it('should return 404 if the user does not exist', async () => {
      const invalidTransaction = { ...transaction, user: 'random' };
      const response = await agent.post('/transactions').send(invalidTransaction);
      expect(response.status).toBe(404);
    });

    it('should return 400 if the amount is negative', async () => {
      const invalidTransaction = { ...transaction, amount: -100 };
      const response = await agent.post('/transactions').send(invalidTransaction);
      expect(response.status).toBe(400);
    });

    it('should return 400 if the type is invalid', async () => {
      const invalidTransaction = { ...transaction, type: 'invalid' };
      const response = await agent.post('/transactions').send(invalidTransaction);
      expect(response.status).toBe(400);
    });
  });
});
