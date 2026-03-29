import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';

@Injectable()
export class PerformancesService {
  constructor(private prisma: PrismaService) {}

  async create(exerciseId: string, data: CreatePerformanceDto) {
    const { date, weight, reps } = data;

    const exercise = await this.prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with id ${exerciseId} not found`);
    }

    return await this.prisma.performance.create({
      data: {
        date,
        weight,
        reps,
        exercise: {
          connect: { id: exerciseId },
        },
      },
    });
  }

  async update(performanceId: string, dto: UpdatePerformanceDto) {
    const updated = await this.prisma.performance.updateMany({
      where: {
        id: performanceId,
      },
      data: dto,
    });

    if (updated.count === 0) {
      throw new Error('Performance not found or not authorized');
    }

    return updated;
  }

  async delete(performanceId: string) {
    return await this.prisma.performance.delete({
      where: { id: performanceId },
    });
  }

  async findAll(exerciseId: string) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with id ${exerciseId} not found`);
    }

    return await this.prisma.performance.findMany({
      where: {
        exerciseId,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
}
