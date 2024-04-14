import { App } from '@/app';
import { AuthRoute } from '@/application/routes/auth-route';
import { UsersRoute } from '@/application/routes/users.route';
import { authAgent } from '@/test-utils';
import { SuperAgentTest } from 'supertest';

describe('Users Route', () => {
  let app: App;
  let agent: SuperAgentTest;
  let createdUserId: string;

  beforeAll(async () => {
    app = new App([new AuthRoute(), new UsersRoute()]);
    agent = await authAgent(app.getServer());
  });
});
