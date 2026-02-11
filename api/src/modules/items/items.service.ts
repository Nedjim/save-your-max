import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async create(categoryId: string, data: createItemDto) {
    const { date, charge, reps } = data;

    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }

    return await this.prisma.item.create({
      data: {
        date,
        charge,
        reps,
        category: {
          connect: { id: categoryId },
        },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.item.delete({ where: { id } });
  }

  async findAll(categoryId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }

    return await this.prisma.item.findMany({
      where: {
        categoryId,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
}
