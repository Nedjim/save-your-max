import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePerformanceDto } from '../dto/create-performance.dto';
import { UpdatePerformanceDto } from '../dto/update-performance.dto';
import { PerformancesService } from '../performances.service';

describe('PerformancesService', () => {
  let service: PerformancesService;

  const mockPrismaService = {
    exercise: {
      findUnique: jest.fn(),
    },
    performance: {
      create: jest.fn(),
      updateMany: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
    },
  };

  const exerciseId = 'exercise-123';
  const performanceId = 'performance-123';

  const mockExercise = {
    id: exerciseId,
    title: 'Bench Press',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PerformancesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PerformancesService>(PerformancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a performance associated with an existing exercise', async () => {
    const date = new Date('2026-11-27T10:00:00.000Z');

    const dto: CreatePerformanceDto = {
      weight: 100,
      reps: 10,
      date,
    };

    const expectedResult = {
      id: performanceId,
      weight: 100,
      reps: 10,
      date,
      exerciseId,
    };

    mockPrismaService.exercise.findUnique.mockResolvedValue(mockExercise);
    mockPrismaService.performance.create.mockResolvedValue(expectedResult);

    const result = await service.create(exerciseId, dto);

    expect(mockPrismaService.exercise.findUnique).toHaveBeenCalledWith({
      where: { id: exerciseId },
    });

    expect(mockPrismaService.performance.create).toHaveBeenCalledWith({
      data: {
        weight: 100,
        reps: 10,
        date,
        exercise: {
          connect: { id: exerciseId },
        },
      },
    });

    expect(result).toEqual(expectedResult);
  });

  it('should create a performance without a date', async () => {
    const dto: CreatePerformanceDto = {
      weight: 100,
      reps: 10,
    };

    const expectedResult = {
      id: performanceId,
      weight: 100,
      reps: 10,
      exerciseId,
    };

    mockPrismaService.exercise.findUnique.mockResolvedValue(mockExercise);
    mockPrismaService.performance.create.mockResolvedValue(expectedResult);

    const result = await service.create(exerciseId, dto);

    expect(mockPrismaService.performance.create).toHaveBeenCalledWith({
      data: {
        weight: 100,
        reps: 10,
        date: undefined,
        exercise: {
          connect: { id: exerciseId },
        },
      },
    });

    expect(result).toEqual(expectedResult);
  });

  it('should throw NotFoundException when the exercise does not exist', async () => {
    mockPrismaService.exercise.findUnique.mockResolvedValue(null);

    await expect(
      service.create(exerciseId, {
        weight: 100,
        reps: 10,
      }),
    ).rejects.toThrow(
      new NotFoundException(`Exercise with id ${exerciseId} not found`),
    );

    expect(mockPrismaService.performance.create).not.toHaveBeenCalled();
  });

  it('should update a performance', async () => {
    const dto: UpdatePerformanceDto = {
      weight: 120,
      reps: 8,
    };

    const expectedResult = { count: 1 };

    mockPrismaService.performance.updateMany.mockResolvedValue(expectedResult);

    const result = await service.update(performanceId, dto);

    expect(mockPrismaService.performance.updateMany).toHaveBeenCalledWith({
      where: {
        id: performanceId,
      },
      data: dto,
    });

    expect(result).toEqual(expectedResult);
  });

  it('should throw an error when the performance does not exist', async () => {
    mockPrismaService.performance.updateMany.mockResolvedValue({
      count: 0,
    });

    await expect(
      service.update(performanceId, { weight: 120 }),
    ).rejects.toThrow('Performance not found or not authorized');
  });

  it('should delete a performance', async () => {
    const expectedResult = {
      id: performanceId,
      weight: 100,
      reps: 10,
    };

    mockPrismaService.performance.delete.mockResolvedValue(expectedResult);

    const result = await service.delete(performanceId);

    expect(mockPrismaService.performance.delete).toHaveBeenCalledTimes(1);

    expect(mockPrismaService.performance.delete).toHaveBeenCalledWith({
      where: {
        id: performanceId,
      },
    });

    expect(result).toEqual(expectedResult);
  });

  it('should propagate an error when Prisma cannot find the performance', async () => {
    const prismaError = new Error('Record to delete does not exist');

    mockPrismaService.performance.delete.mockRejectedValue(prismaError);

    await expect(service.delete(performanceId)).rejects.toThrow(prismaError);
  });

  it('should return all performances of an existing exercise ordered by date descending', async () => {
    const expectedResult = [
      {
        id: 'performance-2',
        weight: 120,
        reps: 8,
        exerciseId,
        date: new Date('2026-11-27T10:00:00.000Z'),
      },
      {
        id: 'performance-1',
        weight: 100,
        reps: 10,
        exerciseId,
        date: new Date('2026-11-20T10:00:00.000Z'),
      },
    ];

    mockPrismaService.exercise.findUnique.mockResolvedValue(mockExercise);
    mockPrismaService.performance.findMany.mockResolvedValue(expectedResult);

    const result = await service.findAll(exerciseId);

    expect(mockPrismaService.exercise.findUnique).toHaveBeenCalledWith({
      where: { id: exerciseId },
    });

    expect(mockPrismaService.performance.findMany).toHaveBeenCalledWith({
      where: {
        exerciseId,
      },
      orderBy: {
        date: 'desc',
      },
    });

    expect(result).toEqual(expectedResult);
  });

  it('should return an empty array when the exercise has no performances', async () => {
    mockPrismaService.exercise.findUnique.mockResolvedValue(mockExercise);
    mockPrismaService.performance.findMany.mockResolvedValue([]);

    const result = await service.findAll(exerciseId);

    expect(result).toEqual([]);
  });

  it('should throw NotFoundException when the exercise does not exist', async () => {
    mockPrismaService.exercise.findUnique.mockResolvedValue(null);

    await expect(service.findAll(exerciseId)).rejects.toThrow(
      new NotFoundException(`Exercise with id ${exerciseId} not found`),
    );

    expect(mockPrismaService.performance.findMany).not.toHaveBeenCalled();
  });
});
