import mongoose from 'mongoose';

// global.console = {
//   ...console,
//   // uncomment to ignore a specific log level
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
//   warn: jest.fn(),
//   error: jest.fn(),
// };

afterAll(async () => {
  await mongoose.connection.close();
});
