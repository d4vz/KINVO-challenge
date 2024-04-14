import { App } from '@/app';
import { CreateUserDto, UpdateUserDto } from '@/application/dtos/users.dto';
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

  const user: CreateUserDto = {
    name: 'test-user',
    email: 'test-user@gmail.com',
    password: 'password',
  };

  describe('POST /users', () => {
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

  describe('GET /users', () => {
    it('should return 200 with an array of users', async () => {
      const response = await agent.get('/users');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      const user = response.body.find((user: any) => user._id === createdUserId);
      expect(user).toBeDefined();
    });
  });

  describe('GET /users/:id', () => {
    it('should return 200 with the user', async () => {
      const response = await agent.get(`/users/${createdUserId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id', createdUserId);
    });

    it('should return 404 if user is not found', async () => {
      const response = await agent.get('/users/123');
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /users/:id', () => {
    const updatedUser: UpdateUserDto = {
      name: 'updated-user',
    };

    it('should return 200 with the updated user', async () => {
      const response = await agent.put(`/users/${createdUserId}`).send(updatedUser);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('name', updatedUser.name);
    });

    it('should return 404 if user is not found', async () => {
      const response = await agent.put('/users/123').send(updatedUser);
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should return 200 if user is deleted', async () => {
      const response = await agent.delete(`/users/${createdUserId}`);
      expect(response.status).toBe(200);
    });

    it('should return 404 if user is not found', async () => {
      const response = await agent.delete('/users/123');
      expect(response.status).toBe(404);
    });
  });
});
