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
        profileId,
      },
    });
  }

  async delete(profileId: string, id: string) {
    return await this.prisma.exercise.deleteMany({ where: { id, profileId } });
  }

  async findAll(profileId: string) {
    return await this.prisma.exercise.findMany({
      where: { profileId },
      orderBy: { title: 'asc' },
    });
  }
}
