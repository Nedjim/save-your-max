import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(SupabaseAuthGuard)
  @Post()
  create(@Req() req, @Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(req.user.id, dto);
  }

  @UseGuards(SupabaseAuthGuard)
  @Delete(':id')
  async deleteCategory(@Req() req, @Param('id') id: string) {
    return this.categoriesService.delete(req.user.id, id);
  }

  @UseGuards(SupabaseAuthGuard)
  @Get()
  findAll(@Req() req) {
    return this.categoriesService.findAll(req.user.id);
  }
}
