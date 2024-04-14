import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInDto = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type SignUpDto = z.infer<typeof signUpSchema>;
