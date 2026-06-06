import { z } from 'zod';

export const RegisterSchema = z
  .object({
    email: z
      .email({ message: 'Invalid email address' })
      .min(1, { message: 'Email is required' })
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(100),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });