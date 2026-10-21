import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfilesService } from './profiles.service';

describe('ProfilesService', () => {
  let service: ProfilesService;

  const prismaServiceMock = {
    profile: {
      upsert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a profile for a user', async () => {
    const userId = 'user-123';
    const expectedProfile = { id: 'profile-123', userId };

    prismaServiceMock.profile.upsert.mockResolvedValue(expectedProfile);

    await expect(service.create(userId)).resolves.toEqual(expectedProfile);

    expect(prismaServiceMock.profile.upsert).toHaveBeenCalledWith({
      where: { userId },
      update: {},
      create: { userId },
    });
  });
});
