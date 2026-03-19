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
import { CreateExercisesDto } from './dto/create-exercise.dto';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @UseGuards(SupabaseAuthGuard)
  @Post()
  create(@Req() req, @Body() dto: CreateExercisesDto) {
    return this.exercisesService.create(req.user.id, dto);
  }

  @UseGuards(SupabaseAuthGuard)
  @Delete(':id')
  async delete(@Req() req, @Param('id') id: string) {
    return this.exercisesService.delete(req.user.id, id);
  }

  @UseGuards(SupabaseAuthGuard)
  @Get()
  findAll(@Req() req) {
    return this.exercisesService.findAll(req.user.id);
  }
}
