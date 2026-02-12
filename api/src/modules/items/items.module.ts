import { Module } from '@nestjs/common';
import { CategoryItemsController } from './category-items.controller';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  controllers: [ItemsController, CategoryItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
