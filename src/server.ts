import { App } from '@/app';
import { UsersRoute } from '@/application/routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { AuthRoute } from './application/routes/auth-route';
import { TransactionsRoute } from './application/routes/transaction.route';

ValidateEnv();

const app = new App([new AuthRoute(), new UsersRoute(), new TransactionsRoute()]);

app.listen();
