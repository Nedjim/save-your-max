import * as z from 'zod';

export const createExerciseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Exercise name is required')
    .max(50, 'The name is too long'),
});
