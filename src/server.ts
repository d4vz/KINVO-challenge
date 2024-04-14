import { App } from '@/app';
import { UsersRoute } from '@/application/routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { AuthRoute } from './application/routes/auth-route';

ValidateEnv();

const app = new App([new AuthRoute(), new UsersRoute()]);

app.listen();
