import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseAuthGuard } from '../../auth/jwt-auth.guard';
import { ProfileGuard } from '../../auth/profile.guard';
import { UpdatePerformanceDto } from '../dto/update-performance.dto';
import { PerformancesController } from '../performances.controller';
import { PerformancesService } from '../performances.service';

describe('PerformancesController', () => {
  let controller: PerformancesController;

  const mockPerformancesService = {
    update: jest.fn(),
    delete: jest.fn(),
  };

  const performanceId = 'performance-123';

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerformancesController],
      providers: [
        {
          provide: PerformancesService,
          useValue: mockPerformancesService,
        },
      ],
    })
      .overrideGuard(SupabaseAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(ProfileGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<PerformancesController>(PerformancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should update a performance', async () => {
    const dto: UpdatePerformanceDto = {
      weight: 120,
      reps: 8,
    };

    const expectedResult = {
      count: 1,
    };

    mockPerformancesService.update.mockResolvedValue(expectedResult);

    const result = await controller.update(performanceId, dto);

    expect(mockPerformancesService.update).toHaveBeenCalledTimes(1);
    expect(mockPerformancesService.update).toHaveBeenCalledWith(performanceId, {
      weight: 120,
      reps: 8,
    });

    expect(result).toEqual(expectedResult);
  });

  it('should update a performance with only the weight', async () => {
    const dto: UpdatePerformanceDto = {
      weight: 120,
    };

    const expectedResult = {
      count: 1,
    };

    mockPerformancesService.update.mockResolvedValue(expectedResult);

    const result = await controller.update(performanceId, dto);

    expect(mockPerformancesService.update).toHaveBeenCalledWith(performanceId, {
      weight: 120,
    });

    expect(result).toEqual(expectedResult);
  });

  it('should propagate errors from the service', async () => {
    const error = new Error('Performance not found');

    mockPerformancesService.update.mockRejectedValue(error);

    await expect(
      controller.update(performanceId, { weight: 120 }),
    ).rejects.toThrow(error);
  });

  it('should delete a performance', async () => {
    const expectedResult = {
      id: performanceId,
      weight: 100,
      reps: 10,
    };

    mockPerformancesService.delete.mockResolvedValue(expectedResult);

    const result = await controller.delete(performanceId);

    expect(mockPerformancesService.delete).toHaveBeenCalledTimes(1);
    expect(mockPerformancesService.delete).toHaveBeenCalledWith(performanceId);

    expect(result).toEqual(expectedResult);
  });

  it('should propagate errors from the service', async () => {
    const error = new Error('Performance not found');

    mockPerformancesService.delete.mockRejectedValue(error);

    await expect(controller.delete(performanceId)).rejects.toThrow(error);
  });
});
