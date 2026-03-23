import { Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/jwt-auth.guard';
import { ProfileGuard } from '../auth/profile.guard';
import { SupabaseService } from '../supabase/supabase.service';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(
    private profilesService: ProfilesService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Post()
  @UseGuards(SupabaseAuthGuard)
  async create(@Req() req) {
    const userId = req.user.id;

    return this.profilesService.create(userId);
  }

  @Delete()
  @UseGuards(SupabaseAuthGuard, ProfileGuard)
  async delete(@Req() req) {
    const userId = req.user.id;

    await this.profilesService.delete(userId);
    await this.supabaseService.client.auth.admin.deleteUser(userId);

    return { success: true };
  }

  @Get()
  @UseGuards(SupabaseAuthGuard, ProfileGuard)
  async get(@Req() req) {
    return this.profilesService.findOne(req.profile.id);
  }
}
