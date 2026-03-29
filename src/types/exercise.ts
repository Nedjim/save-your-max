/**
 * Represents an exercise created by the user
 * 
 * 1. **id** - Unique identifier (UUID) of the exercise (primary key)
 * 2. **title** - Name of the exercise
 * 3. **createdAt** - Exercise creation date (ISO 8601 string)
 * 4. **updatedAt** - Last update date of the exercise (ISO 8601 string)
 * 5. **profileId** - Identifier of the associeted profile (foreign key)
 * 
 * @example
 * const exercise: Exercise = {
      "id": "uuid-56",
      "title": "Squat",
      "createdAt": "2026-03-29T08:30:56.073Z",
      "updatedAt": "2026-03-29T08:30:56.073Z",
      "profileId": "uuid-profile-123"
    }
 */
export type Exercise = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  profileId: string;
};
