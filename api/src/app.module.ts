import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ItemsModule } from './modules/items/items.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfilesModule } from './modules/profiles/profiles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    CategoriesModule,
    ItemsModule,
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
