import { z } from 'zod';

export const createUserDto = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export type CreateUserDto = z.infer<typeof createUserDto>;

export const updateUserDto = z.object({
  name: z.string().min(2).max(255).optional(),
  email: z.string().email().optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserDto>;
