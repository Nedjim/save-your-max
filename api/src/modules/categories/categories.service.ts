import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({
        data,
      });
    } catch (error) {
      throw new ConflictException('Category already exists');
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.category.delete({ where: {id} });
    } catch (error) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
  }

  async findAll() {
    try {
      const categories = await this.prisma.category.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return categories;
    } catch (error) {
      throw new Error('Someting went wrong!');
    }
  }
}
