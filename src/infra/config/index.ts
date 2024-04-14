import { config as dotenvConfig } from 'dotenv';
import { z } from 'zod';

dotenvConfig({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const envSchema = z.object({
  CREDENTIALS: z.coerce.boolean(),
  NODE_ENV: z.string(),
  PORT: z.string(),
  SECRET_KEY: z.string(),
  LOG_FORMAT: z.string(),
  LOG_DIR: z.string(),
  ORIGIN: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_DATABASE: z.string(),
  TEST_USER_EMAIL: z.string(),
  TEST_USER_PASSWORD: z.string(),
});

export const config = envSchema.parse(process.env);
