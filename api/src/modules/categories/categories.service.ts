import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(profileId: string, dto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: {
        ...dto,
        profileId,
      },
    });
  }

  async delete(profileId: string, id: string) {
    return await this.prisma.category.deleteMany({ where: { id, profileId } });
  }

  async findAll(profileId: string) {
    return await this.prisma.category.findMany({
      where: {profileId},
      orderBy: { title: 'asc' },
    });
  }
}
