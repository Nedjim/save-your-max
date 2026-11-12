import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExercisesDto } from '../dto/create-exercise.dto';
import { ExercisesService } from '../exercises.service';

describe('ExercisesService', () => {
  let service: ExercisesService;

  const mockPrismaService = {
    exercise: {
      create: jest.fn(),
      deleteMany: jest.fn(),
      findMany: jest.fn(),
    },
  };

  const profileId = 'profile-123';

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExercisesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ExercisesService>(ExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an exercise associated with the profile', async () => {
    const dto: CreateExercisesDto = {
      title: 'Bench Press',
    };

    const expectedResult = {
      id: 'exercise-123',
      title: 'Bench Press',
      profileId,
    };

    mockPrismaService.exercise.create.mockResolvedValue(expectedResult);

    const result = await service.create(profileId, dto);

    expect(mockPrismaService.exercise.create).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.exercise.create).toHaveBeenCalledWith({
      data: {
        title: 'Bench Press',
        profile: {
          connect: { id: profileId },
        },
      },
    });
    expect(result).toEqual(expectedResult);
  });

  it('should delete an exercise belonging to the profile', async () => {
    const exerciseId = 'exercise-123';
    const expectedResult = { count: 1 };

    mockPrismaService.exercise.deleteMany.mockResolvedValue(expectedResult);

    const result = await service.delete(profileId, exerciseId);

    expect(mockPrismaService.exercise.deleteMany).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.exercise.deleteMany).toHaveBeenCalledWith({
      where: {
        profileId,
        id: exerciseId,
      },
    });
    expect(result).toEqual(expectedResult);
  });

  it('should throw an error when the exercise does not exist or does not belong to the profile', async () => {
    mockPrismaService.exercise.deleteMany.mockResolvedValue({
      count: 0,
    });

    await expect(service.delete(profileId, 'exercise-123')).rejects.toThrow(
      'Exercise not found or not authorized',
    );

    expect(mockPrismaService.exercise.deleteMany).toHaveBeenCalledWith({
      where: {
        profileId,
        id: 'exercise-123',
      },
    });
  });

  it('should return all exercises belonging to the profile', async () => {
    const expectedResult = [
      {
        id: 'exercise-123',
        title: 'Bench Press',
        profileId,
      },
      {
        id: 'exercise-456',
        title: 'Squat',
        profileId,
      },
    ];

    mockPrismaService.exercise.findMany.mockResolvedValue(expectedResult);

    const result = await service.findAll(profileId);

    expect(mockPrismaService.exercise.findMany).toHaveBeenCalledTimes(1);
    expect(mockPrismaService.exercise.findMany).toHaveBeenCalledWith({
      where: { profileId },
      orderBy: { title: 'asc' },
    });
    expect(result).toEqual(expectedResult);
  });

  it('should return an empty array when the profile has no exercises', async () => {
    mockPrismaService.exercise.findMany.mockResolvedValue([]);

    const result = await service.findAll(profileId);

    expect(result).toEqual([]);
  });
});
