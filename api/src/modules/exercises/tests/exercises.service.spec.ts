import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExercisesDto } from '../dto/create-exercise.dto';
import { ExercisesService } from '../exercises.service';
import { prismaServiceMock } from './prisma.mock';

describe('ExercisesService', () => {
  let service: ExercisesService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExercisesService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<ExercisesService>(ExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an exercise for a profile', async () => {
    const profileId = 'profile-id';
    const id = 'exercise-123';
    const dto = { title: 'Deadlift' } satisfies CreateExercisesDto;
    const expectedExercise = { profileId, id };

    prismaServiceMock.exercise.create.mockResolvedValue(expectedExercise);

    await expect(service.create(profileId, dto)).resolves.toEqual(
      expectedExercise,
    );

    expect(prismaServiceMock.exercise.create).toHaveBeenCalledTimes(1);

    expect(prismaServiceMock.exercise.create).toHaveBeenCalledWith({
      data: {
        ...dto,
        profile: {
          connect: { id: profileId },
        },
      },
    });
  });

  it('should delete an exercise for a profile', async () => {
    const profileId = 'profile-id';
    const id = 'exercise-123';
    const expectedResult = { count: 1 };

    prismaServiceMock.exercise.deleteMany.mockResolvedValue(expectedResult);

    await expect(service.delete(profileId, id)).resolves.toEqual(
      expectedResult,
    );

    expect(prismaServiceMock.exercise.deleteMany).toHaveBeenCalledTimes(1);

    expect(prismaServiceMock.exercise.deleteMany).toHaveBeenCalledWith({
      where: {
        profileId,
        id,
      },
    });
  });

  it('should throw an error if the exercise does not exist for a profile', async () => {
    const profileId = 'profile-id';
    const exerciseId = 'exercise-123';
    const expectedResult = { count: 0 };

    prismaServiceMock.exercise.deleteMany.mockResolvedValue(expectedResult);

    await expect(service.delete(profileId, exerciseId)).rejects.toThrow(
      'Exercise not found or not authorized',
    );

    expect(prismaServiceMock.exercise.deleteMany).toHaveBeenCalledWith({
      where: {
        profileId,
        id: exerciseId,
      },
    });
  });

  it('should find all exercises for a profile', async () => {
    const profileId = 'profile-id';
    const id = 'exercise-123';
    const expectedExercises = [
      { id: 'exercise-123', profileId, title: 'Deadlift' },
      { id: 'exercise-456', profileId, title: 'Squat' },
    ];

    prismaServiceMock.exercise.findMany.mockResolvedValue(expectedExercises);

    await expect(service.findAll(profileId)).resolves.toEqual(
      expectedExercises,
    );

    expect(prismaServiceMock.exercise.findMany).toHaveBeenCalledTimes(1);
    expect(prismaServiceMock.exercise.findMany).toHaveBeenCalledWith({
      where: { profileId },
      orderBy: { title: 'asc' },
    });
  });

  it('should return an empty array if the profile has no exercises', async () => {
    const profileId = 'profile-id';

    prismaServiceMock.exercise.findMany.mockResolvedValue([]);

    await expect(service.findAll(profileId)).resolves.toEqual([]);
  });
});
