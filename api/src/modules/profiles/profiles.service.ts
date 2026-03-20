import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string) {
    return this.prisma.profile.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
      },
    });
  }

  async findOne(profileId: number) {
    return this.prisma.profile.findUnique({
      where: { id: profileId },
    });
  }
}
