import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/jwt-auth.guard';
import { ProfileGuard } from '../auth/profile.guard';
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

  @Get()
  @UseGuards(SupabaseAuthGuard, ProfileGuard)
  async get(@Req() req) {
    return this.profilesService.findOne(req.profile.id);
  }
}
