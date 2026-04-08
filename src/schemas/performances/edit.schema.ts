import * as z from 'zod';

/**
 * Zod schema for editing a performance entry.
 *
 * This schema validates and transforms the fields of a performance form:
 * 1. **weight** - String from the input, transformed into a number, must be >= 0
 * 2. **reps** - String from the input, transformed into a number, must be >= 0
 * 3. **date** - Date object
 *
 * The schema is intended for use with zodResolver in React Hook Form to ensure:
 * 1. Client-side validation of the form values.
 * 2. Automatic transformation of `weight` and `reps` from strings to numbers.
 */

export const editPerformanceSchema = z.object({
  weight: z
    .string()
    .trim()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: 'Weight must be a number' })
    .refine((val) => val >= 0, { message: 'Weight must not be lower than 0' }),
  reps: z
    .string()
    .trim()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: 'Reps must be a number' })
    .refine((val) => val >= 0, { message: 'Reps must not be lower than 0' }),
  date: z.date(),
});
