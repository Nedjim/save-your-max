import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfilesService } from '../profiles.service';
import { prismaServiceMock } from './prisma.mock';

describe('ProfilesService', () => {
  let service: ProfilesService;

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

  it('should update a profile for a user', async () => {
    const userId = 'user-123';
    const dto = { name: 'Test', surname: '' };
    const expectedProfile = { id: 'profile-id', name: 'Test', surname: '' };

    prismaServiceMock.profile.update.mockResolvedValue(expectedProfile);

    await expect(service.update(userId, dto)).resolves.toEqual(expectedProfile);

    expect(prismaServiceMock.profile.update).toHaveBeenCalledWith({
      where: { userId },
      data: dto,
    });
  });

  it('should exclude undefined values when updating a profile', async () => {
    const userId = 'user-123';
    const dto = { name: 'Test', surname: undefined, pseudo: undefined };
    const filteredDto = { name: 'Test' };
    const expectedProfile = { id: 'profile-id', name: 'Test' };

    prismaServiceMock.profile.update.mockResolvedValue(expectedProfile);

    await expect(service.update(userId, dto)).resolves.toEqual(expectedProfile);

    expect(prismaServiceMock.profile.update).toHaveBeenCalledWith({
      where: { userId },
      data: filteredDto,
    });
  });

  it('should delete a profile', async () => {
    const userId = 'user-123';
    const expectedProfile = { id: 'profile-id', userId };

    prismaServiceMock.profile.delete.mockResolvedValue(expectedProfile);

    await expect(service.delete(userId)).resolves.toEqual(expectedProfile);

    expect(prismaServiceMock.profile.delete).toHaveBeenCalledWith({
      where: { userId },
    });
  });

  it('should find a profile', async () => {
    const profileId = 'profile-id';
    const expectedProfile = { id: profileId };

    prismaServiceMock.profile.findUnique.mockResolvedValue(expectedProfile);

    await expect(service.findOne(profileId)).resolves.toEqual(expectedProfile);

    expect(prismaServiceMock.profile.findUnique).toHaveBeenCalledWith({
      where: { id: profileId },
    });
  });

  it('should return null when the profile does not exist', async () => {
    const profileId = 'unknown-profile';

    prismaServiceMock.profile.findUnique.mockResolvedValue(null);

    await expect(service.findOne(profileId)).resolves.toBeNull();

    expect(prismaServiceMock.profile.findUnique).toHaveBeenCalledWith({
      where: { id: profileId },
    });
  });
});
