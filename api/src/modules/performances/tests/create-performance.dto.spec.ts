import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreatePerformanceDto } from '../dto/create-performance.dto';

describe('CreatePerformanceDto', () => {
  it('should accept valid data', async () => {
    const dto = plainToInstance(CreatePerformanceDto, {
      weight: 100,
      reps: 10,
      date: '2026-11-27T10:00:00.000Z',
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
    expect(dto.date).toBeInstanceOf(Date);
  });

  it('should accept valid data without date', async () => {
    const dto = plainToInstance(CreatePerformanceDto, {
      weight: 100,
      reps: 10,
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });

  describe('weight', () => {
    it('should reject a missing weight', async () => {
      const dto = plainToInstance(CreatePerformanceDto, {
        reps: 10,
      });

      const errors = await validate(dto);

      expect(errors.some((error) => error.property === 'weight')).toBe(true);
    });

    it('should reject a negative weight', async () => {
      const dto = plainToInstance(CreatePerformanceDto, {
        weight: -10,
        reps: 10,
      });

      const errors = await validate(dto);

      expect(errors.some((error) => error.property === 'weight')).toBe(true);
    });

    it('should reject a decimal weight', async () => {
      const dto = plainToInstance(CreatePerformanceDto, {
        weight: 10.5,
        reps: 10,
      });

      const errors = await validate(dto);

      expect(errors.some((error) => error.property === 'weight')).toBe(true);
    });

    it('should accept a weight equal to zero', async () => {
      const dto = plainToInstance(CreatePerformanceDto, {
        weight: 0,
        reps: 10,
      });

      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
    });
  });

  describe('reps', () => {
    it('should reject a missing reps', async () => {
      const dto = plainToInstance(CreatePerformanceDto, {
        weight: 100,
      });

      const errors = await validate(dto);

      expect(errors.some((error) => error.property === 'reps')).toBe(true);
    });

    it('should reject negative reps', async () => {
      const dto = plainToInstance(CreatePerformanceDto, {
        weight: 100,
        reps: -5,
      });

      const errors = await validate(dto);

      expect(errors.some((error) => error.property === 'reps')).toBe(true);
    });

    it('should reject decimal reps', async () => {
      const dto = plainToInstance(CreatePerformanceDto, {
        weight: 100,
        reps: 5.5,
      });

      const errors = await validate(dto);

      expect(errors.some((error) => error.property === 'reps')).toBe(true);
    });

    it('should accept reps equal to zero', async () => {
      const dto = plainToInstance(CreatePerformanceDto, {
        weight: 100,
        reps: 0,
      });

      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
    });
  });

  describe('date', () => {
    it('should reject an invalid date', async () => {
      const dto = plainToInstance(CreatePerformanceDto, {
        weight: 100,
        reps: 10,
        date: 'invalid-date',
      });

      const errors = await validate(dto);

      expect(errors.some((error) => error.property === 'date')).toBe(true);
    });

    it('should accept a valid Date object', async () => {
      const dto = plainToInstance(CreatePerformanceDto, {
        weight: 100,
        reps: 10,
        date: new Date('2026-11-27T10:00:00.000Z'),
      });

      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
    });
  });
});
