import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string) {
    return this.prisma.profile.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
      },
    });
  }

  async findOne(userId: string) {
    return this.prisma.profile.findUnique({
      where: { id: userId },
    });
  }
}
