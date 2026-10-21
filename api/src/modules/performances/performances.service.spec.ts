import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { PerformancesService } from './performances.service';

describe('PerformancesService', () => {
  let service: PerformancesService;

  const prismaServiceMock = {
    performance: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
      updateMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PerformancesService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<PerformancesService>(PerformancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
