import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdatePerformanceDto } from '../dto/update-performance.dto';

describe('UpdatePerformanceDto', () => {
  it('should accept an empty object', async () => {
    const dto = plainToInstance(UpdatePerformanceDto, {});

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it('should accept a valid weight only', async () => {
    const dto = plainToInstance(UpdatePerformanceDto, {
      weight: 120,
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it('should accept valid reps only', async () => {
    const dto = plainToInstance(UpdatePerformanceDto, {
      reps: 8,
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });

  it('should accept a valid date only', async () => {
    const dto = plainToInstance(UpdatePerformanceDto, {
      date: '2026-11-27T10:00:00.000Z',
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
    expect(dto.date).toBeInstanceOf(Date);
  });

  it('should reject a negative weight', async () => {
    const dto = plainToInstance(UpdatePerformanceDto, {
      weight: -10,
    });

    const errors = await validate(dto);

    expect(errors.some((error) => error.property === 'weight')).toBe(true);
  });

  it('should reject negative reps', async () => {
    const dto = plainToInstance(UpdatePerformanceDto, {
      reps: -5,
    });

    const errors = await validate(dto);

    expect(errors.some((error) => error.property === 'reps')).toBe(true);
  });

  it('should reject an invalid date', async () => {
    const dto = plainToInstance(UpdatePerformanceDto, {
      date: 'invalid-date',
    });

    const errors = await validate(dto);

    expect(errors.some((error) => error.property === 'date')).toBe(true);
  });
});
