import { logger } from '@/utils/logger';
import mongoose, { ConnectOptions, connect, set } from 'mongoose';
import { config } from '../config';

interface DBConfig {
  url: string;
  options: ConnectOptions;
}

const { DB_HOST, DB_PORT, DB_DATABASE, NODE_ENV } = config;

mongoose.set('strictQuery', false);

export const dbConnection = async () => {
  const dbConfig: DBConfig = {
    url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
    options: {
      dbName: DB_DATABASE,
    },
  };

  if (NODE_ENV !== 'production') {
    set('debug', true);
  }

  await connect(dbConfig.url, dbConfig.options, result => {
    if (result?.message) logger.error(result.message);
    logger.info('Connected to MongoDB');
  });
};
