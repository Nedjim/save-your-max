import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/jwt-auth.guard';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Post()
  @UseGuards(SupabaseAuthGuard)
  async create(@Req() req) {
    const userId = req.user.id;

    return this.profilesService.create(userId);
  }
}
