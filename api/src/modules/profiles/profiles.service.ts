import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

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

  async update(userId: string, dto: UpdateProfileDto) {
    const filteredDto = Object.fromEntries(
      Object.entries(dto).filter(([_, value]) => value !== undefined),
    );

    return this.prisma.profile.update({
      where: { userId },
      data: dto,
    });
  }

  async delete(userId: string) {
    return this.prisma.profile.delete({
      where: { userId },
    });
  }

  async findOne(profileId: string) {
    return this.prisma.profile.findUnique({
      where: { id: profileId },
    });
  }
}
