import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExercisesDto } from './dto/create-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async create(profileId: string, dto: CreateExercisesDto) {
    return await this.prisma.exercise.create({
      data: {
        ...dto,
        profile: {
          connect: { id: profileId },
        },
      },
    });
  }

  async delete(profileId: string, exerciseId: string) {
    const deleted = await this.prisma.exercise.deleteMany({
      where: {
        profileId,
        id: exerciseId,
      },
    });

    if (deleted.count === 0) {
      throw new Error('Exercise not found or not authorized');
    }

    return deleted;
  }

  async findAll(profileId: string) {
    return this.prisma.exercise.findMany({
      where: { profileId },
      orderBy: { title: 'asc' },
    });
  }
}
