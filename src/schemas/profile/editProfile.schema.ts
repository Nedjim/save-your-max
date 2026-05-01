import dayjs from 'dayjs';
import * as z from 'zod';

/**
 * Zod schema for update a profile informations.
 *
 * This schema validates and transforms the fields of a performance form:
 * 1. **name** - String from the input
 * 2. **surname** - String from the input
 * 3. **pseudo** - String from the input
 * 4. **birthday** - ISO 8601 string
 *
 */
export const updateProfileSchema = z.object({
  name: z.string().trim().max(100, 'The name is too long').optional(),
  surname: z.string().trim().max(100, 'The surname is too long').optional(),
  pseudo: z.string().trim().max(20, 'The surname is too long').optional(),
  birthday: z
    .string()
    .optional()
    .refine(
      (date) => {
        if (!date) return true;
        return dayjs(date).isBefore(dayjs());
      },
      {
        message: 'Your date of birth must not be in the future',
      },
    ),
});
