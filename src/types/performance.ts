/**
 * Represents a performance entry for a specific exercise.
 * 
 * This model stores the result of a workout session (e.g. weight and repetitions)
 * and is associated to an exercise.
 * 
 * 1. **id** - Unique identifier (UUID) of the performance (primary key)
 * 2. **date** - Date when the performance was performed (ISO 8601 string)
 * 3. **weight** - Weight lifted for the exercise (unit depends on the system: kg, lbs, etc.)
 * 4. **reps** - Number of repetitions performed
 * 5. **createdAt** - Performance creation date (ISO 8601 string)
 * 6. **updatedAt** - Last update date of the performance (ISO 8601 string)
 * 7. **exerciseId** - Identifier of the associated exercise (foreign key)
 * 
 * @example
 * const performance: Performance = {
      "id": "uuid-58",
      "date": "2026-03-29T08:31:04.487Z",
      "weight": 35,
      "reps": 12,
      "createdAt": "2026-03-29T08:31:06.351Z",
      "updatedAt": "2026-03-29T08:31:06.351Z",
      "exerciseId": "uuid-exercise-1234"
    }
 * 
 */
export type Performance = {
  id: string;
  date: string;
  weight: number;
  reps: number;
  createdAt: string;
  updatedAt: string;
  exerciseId: string;
};

/**
 * Represents the payload required to create a new performance entry.
 * 
 * This payload is used to record a workout result (e.g. weight and repetitions)
 * for a specific exercise.
 * 
 * 1. **weight** - Weight lifted for the exercise (unit depends on the system: kg, lbs, etc.)
 * 2. **reps** - Number of repetitions performed
 * 3. **date** - Date when the performance was performed (ISO 8601 string)
 * 
 * @example
 * const payload: CreatePerformancePayload = {
      "weight": 35,
      "reps": 12,
      "date": "2026-03-29T08:31:06.351Z",
    }
 */
export type CreatePerformancePayload = {
  weight: number;
  reps: number;
  date: string;
};

/**
 * Represents the payload required to update an existing performance.
 * 
 * This payload combines:
 * - a partial version of `CreatePerformancePayload` (only the fields to update are required)
 * - a required `id` to identify the performance to update
 * 
 * @example
 * const payload: UpdatePerformancePayload = {
      "id": "uuid-58",
      "weight": 35,
      "reps": 12,
      "date": "2026-03-29T08:31:06.351Z",
    }
 */
export type UpdatePerformancePayload = Partial<CreatePerformancePayload> & {
  id: string;
};
