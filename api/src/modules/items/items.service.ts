import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async create(categoryId: string, data: CreateItemDto) {
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

  async update(id: string, data: UpdateItemDto) {
    return await this.prisma.item.update({
      where: {
        id,
      },
      data,
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
