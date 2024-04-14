import { config } from '@/infra/config';
import { Application } from 'express';
import { SuperAgentTest, agent as supertest } from 'supertest';

export const testUser = {
  email: config.TEST_USER_EMAIL,
  password: config.TEST_USER_PASSWORD,
};

export const authAgent = async (app: Application): Promise<SuperAgentTest> => {
  const agent = supertest(app);

  await agent
    .post('/auth/sign-in')
    .send(testUser)
    .set('Content-Type', 'application/json')
    .then(response => {
      const token = response.body.token;
      if (!token) throw new Error('Token not found');
      agent.set('Authorization', `Bearer ${token}`);
    });

  return agent;
};
