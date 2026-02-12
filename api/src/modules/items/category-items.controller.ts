import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';

@Controller('categories/:categoryId/items')
export class CategoryItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Param('categoryId') categoryId: string, @Body() data: CreateItemDto) {
    return this.itemsService.create(categoryId, {
      ...data,
    });
  }

  @Get()
  findAll(@Param('categoryId') categoryId: string) {
    return this.itemsService.findAll(categoryId);
  }
}
