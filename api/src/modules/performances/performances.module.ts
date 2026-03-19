import { Module } from '@nestjs/common';
import { ExercisePerformanceController } from './exercise-performances.controller';
import { PerformancesController } from './performances.controller';
import { PerformancesService } from './performances.service';

@Module({
  controllers: [PerformancesController, ExercisePerformanceController],
  providers: [PerformancesService],
})
export class PerformancesModule {}
