import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';

@Injectable()
export class PerformancesService {
  constructor(private prisma: PrismaService) {}

  async create(exerciseId: string, data: CreatePerformanceDto) {
    const { date, charge, reps } = data;

    const exercise = await this.prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with id ${exerciseId} not found`);
    }

    return await this.prisma.performance.create({
      data: {
        date,
        charge,
        reps,
        exercise: {
          connect: { id: exerciseId },
        },
      },
    });
  }

  async update(id: string, data: UpdatePerformanceDto) {
    return await this.prisma.performance.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.performance.delete({ where: { id } });
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
