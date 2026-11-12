import { validate } from 'class-validator';
import { CreateExercisesDto } from '../dto/create-exercise.dto';

describe('CreateExercisesDto', () => {
  it('should accept a valid title', async () => {
    const dto = new CreateExercisesDto();
    dto.title = 'Bench Press';

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it('should reject an empty title', async () => {
    const dto = new CreateExercisesDto();
    dto.title = '';

    const errors = await validate(dto);

    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('title');
  });

  it('should reject a missing title', async () => {
    const dto = new CreateExercisesDto();

    const errors = await validate(dto);

    expect(errors).toHaveLength(1);
  });

  it('should reject a non-string title', async () => {
    const dto = new CreateExercisesDto();
    dto.title = 123 as unknown as string;

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('title');
  });

  it('should reject a title longer than 100 characters', async () => {
    const dto = new CreateExercisesDto();
    dto.title = 'A'.repeat(101);

    const errors = await validate(dto);

    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('title');
    expect(errors[0].constraints).toHaveProperty('maxLength');
    expect(errors[0].constraints?.maxLength).toBe('The title is too long');
  });

  it('should accept a title with exactly 100 characters', async () => {
    const dto = new CreateExercisesDto();
    dto.title = 'A'.repeat(100);

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });
});
