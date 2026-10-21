import { Test, TestingModule } from '@nestjs/testing';
import { ProfileGuard } from '../auth/profile.guard';
import { SupabaseService } from '../supabase/supabase.service';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

describe('ProfilesController', () => {
  let controller: ProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [
        {
          provide: ProfilesService,
          useValue: {},
        },
        {
          provide: SupabaseService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(ProfileGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .compile();

    controller = module.get<ProfilesController>(ProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
