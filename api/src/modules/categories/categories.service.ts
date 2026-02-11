import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    return await this.prisma.category.create({
      data,
    });
  }

  async delete(id: string) {
    return await this.prisma.category.delete({ where: { id } });
  }

  async findAll() {
    return await this.prisma.category.findMany({
      orderBy: { title: 'asc' },
    });
  }
}
