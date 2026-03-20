import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/jwt-auth.guard';
import { ProfileGuard } from '../auth/profile.guard';
import { CreateExercisesDto } from './dto/create-exercise.dto';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @UseGuards(SupabaseAuthGuard, ProfileGuard)
  @Post()
  create(@Req() req, @Body() dto: CreateExercisesDto) {
    return this.exercisesService.create(req.profile.id, dto);
  }

  @UseGuards(SupabaseAuthGuard, ProfileGuard)
  @Delete(':id')
  async delete(@Req() req, @Param('id') id: string) {
    return this.exercisesService.delete(req.profile.id, id);
  }

  @UseGuards(SupabaseAuthGuard, ProfileGuard)
  @Get()
  findAll(@Req() req) {
    return this.exercisesService.findAll(req.profile.id);
  }
}
