import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { createItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';

@Controller('categories/:categoryId/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Param('categoryId') categoryId: string, @Body() data: createItemDto) {
    return this.itemsService.create(categoryId, {
      ...data,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemsService.delete(id);
  }

  @Get()
  findAll(@Param('categoryId') categoryId: string) {
    return this.itemsService.findAll(categoryId);
  }
}
