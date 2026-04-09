import * as z from 'zod';

export const updateEmailSchema = z
  .object({
    email: z.email('Invalid email'),
    confirmedEmail: z.string().min(1, 'Please confirm your e-mail'),
  })
  .refine((data) => data.email === data.confirmedEmail, {
    message: "Emails don't match",
    path: ['confirmedEmail'],
  });
