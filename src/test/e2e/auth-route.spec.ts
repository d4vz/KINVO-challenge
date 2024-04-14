import { App } from '@/app';
import { SignUpDto } from '@/application/dtos/auth.dto';
import { AuthRoute } from '@/application/routes/auth-route';
import { MongoUsersRepository } from '@/infra/repositories/users/mongo-users-repository';
import supertest, { SuperAgentTest } from 'supertest';

describe('Auth Route', () => {
  let app: App;
  let agent: SuperAgentTest;
  let createdUserId: string;
  let usersRepository: MongoUsersRepository;

  beforeAll(async () => {
    app = new App([new AuthRoute()]);
    agent = supertest.agent(app.app);
    usersRepository = new MongoUsersRepository();
  });

  afterAll(async () => {
    const deleted = await usersRepository.delete(createdUserId);
    expect(deleted).toBeTruthy();
  });

  const user: SignUpDto = {
    name: 'John Doe',
    email: 'johnDoe@email.com',
    password: 'password',
  };

  describe('POST /auth/sign-up', () => {
    it('should return 400 if email is invalid', async () => {
      const response = await agent.post('/auth/sign-up').send({ ...user, email: 'invalid-email' });
      expect(response.status).toBe(400);
    });

    it('should return 201 if user is created', async () => {
      const response = await agent.post('/auth/sign-up').send(user);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      createdUserId = response.body._id;
    });

    it('should return 409 if email already exists', async () => {
      const response = await agent.post('/auth/sign-up').send(user);
      expect(response.status).toBe(409);
    });
  });

  describe('POST /auth/sign-in', () => {
    it('should return 400 if email is invalid', async () => {
      const response = await agent.post('/auth/sign-in').send({ email: 'invalid-email', password: 'password' });
      expect(response.status).toBe(400);
    });

    it('should return 404 if email does not exist', async () => {
      const response = await agent.post('/auth/sign-in').send({ email: 'non-existing-email@gmail.com', password: 'password' });
      expect(response.status).toBe(404);
    });

    it('should return 401 if password is incorrect', async () => {
      const response = await agent.post('/auth/sign-in').send({ email: user.email, password: 'incorrect-password' });
      expect(response.status).toBe(401);
    });

    it('should return 200 if credentials are correct', async () => {
      const response = await agent.post('/auth/sign-in').send({ email: user.email, password: user.password });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });
});
