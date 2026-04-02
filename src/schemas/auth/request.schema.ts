import * as z from 'zod';

export const requestSchema = z.object({
  email: z.email('Invalid email'),
});
