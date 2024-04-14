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
    .post('/auth/login')
    .send(testUser)
    .set('Content-Type', 'application/json')
    .then(response => {
      const cookies = response.header['set-cookie'];
      if (!cookies) throw new Error('No cookies');
      agent.set('Cookie', cookies[0]);
    });

  return agent;
};
