import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import type {
  AuthenticatedRequest,
  ProfileRequest,
} from '../../../common/types/authenticated-request';
import { ProfileGuard } from '../../auth/profile.guard';
import { SupabaseService } from '../../supabase/supabase.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfilesController } from '../profiles.controller';
import { ProfilesService } from '../profiles.service';
import { profilesServiceMock } from './prisma.mock';

describe('ProfilesController', () => {
  let controller: ProfilesController;

  const supabaseServiceMock = {
    client: {
      auth: {
        admin: {
          deleteUser: jest.fn(),
        },
      },
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [
        {
          provide: ProfilesService,
          useValue: profilesServiceMock,
        },
        {
          provide: SupabaseService,
          useValue: supabaseServiceMock,
        },
      ],
    })
      .overrideGuard(SupabaseAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .overrideGuard(ProfileGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .compile();

    controller = module.get<ProfilesController>(ProfilesController);
  });

  it('should create a profile for the authenticated user', async () => {
    const userId = 'user-123';
    const req = { user: { id: userId } } as AuthenticatedRequest;
    const expectedProfile = { id: 'profile-id', userId };

    profilesServiceMock.create.mockResolvedValue(expectedProfile);

    await expect(controller.create(req)).resolves.toEqual(expectedProfile);

    expect(profilesServiceMock.create).toHaveBeenCalledWith(userId);
    expect(profilesServiceMock.create).toHaveBeenCalledTimes(1);
  });

  it('should update a profile for the authenticated user', async () => {
    const userId = 'user-123';
    const req = { user: { id: userId } } as AuthenticatedRequest;
    const data: UpdateProfileDto = { name: 'Test' };
    const expectedProfile = { name: 'Test' };

    profilesServiceMock.update.mockResolvedValue(expectedProfile);

    await expect(controller.update(req, data)).resolves.toEqual(
      expectedProfile,
    );

    expect(profilesServiceMock.update).toHaveBeenCalledWith(userId, data);
    expect(profilesServiceMock.update).toHaveBeenCalledTimes(1);
  });

  it('should delete a profile for the authenticated user', async () => {
    const userId = 'user-123';
    const req = { user: { id: userId } } as AuthenticatedRequest;
    const expectedProfile = { id: 'profile-id', userId };
    const expectedResult = { success: true };

    profilesServiceMock.delete.mockResolvedValue(expectedProfile);
    supabaseServiceMock.client.auth.admin.deleteUser.mockResolvedValue({
      data: { user: null },
      error: null,
    });

    await expect(controller.delete(req)).resolves.toEqual(expectedResult);

    expect(profilesServiceMock.delete).toHaveBeenCalledWith(userId);
    expect(profilesServiceMock.delete).toHaveBeenCalledTimes(1);
    expect(
      supabaseServiceMock.client.auth.admin.deleteUser,
    ).toHaveBeenCalledWith(userId);
    expect(
      supabaseServiceMock.client.auth.admin.deleteUser,
    ).toHaveBeenCalledTimes(1);
  });

  it('should find a profile', async () => {
    const profileId = 'profile-id';
    const userId = 'user-123';
    const req = { profile: { id: profileId } } as ProfileRequest;
    const expectedProfile = { profileId, userId };

    profilesServiceMock.findOne.mockResolvedValue(expectedProfile);

    await expect(controller.get(req)).resolves.toEqual(expectedProfile);

    expect(profilesServiceMock.findOne).toHaveBeenCalledWith(profileId);
    expect(profilesServiceMock.findOne).toHaveBeenCalledTimes(1);
  });
});
