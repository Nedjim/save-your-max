import { Test, TestingModule } from '@nestjs/testing';
import { ProfileGuard } from '../auth/profile.guard';
import { PerformancesController } from './performances.controller';
import { PerformancesService } from './performances.service';

describe('PerformancesController', () => {
  let controller: PerformancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerformancesController],
      providers: [
        {
          provide: PerformancesService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(ProfileGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .compile();

    controller = module.get<PerformancesController>(PerformancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
