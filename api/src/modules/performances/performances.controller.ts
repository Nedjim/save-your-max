import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/jwt-auth.guard';
import { ProfileGuard } from '../auth/profile.guard';
import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { PerformancesService } from './performances.service';

@Controller('performances')
export class PerformancesController {
  constructor(private readonly performancesService: PerformancesService) {}

  @UseGuards(SupabaseAuthGuard, ProfileGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdatePerformanceDto) {
    return this.performancesService.update(id, {
      ...data,
    });
  }

  @UseGuards(SupabaseAuthGuard, ProfileGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.performancesService.delete(id);
  }
}
