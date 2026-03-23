import { Module } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, SupabaseService],
})
export class ProfilesModule {}
