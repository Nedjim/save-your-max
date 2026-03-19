import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { PerformancesService } from './performances.service';

@Controller('exercises/:exerciseId/performances')
export class ExercisePerformanceController {
  constructor(private readonly performancesService: PerformancesService) {}

  @Post()
  create(
    @Param('exerciseId') exerciseId: string,
    @Body() data: CreatePerformanceDto,
  ) {
    return this.performancesService.create(exerciseId, {
      ...data,
    });
  }

  @Get()
  findAll(@Param('exerciseId') exerciseId: string) {
    return this.performancesService.findAll(exerciseId);
  }
}
