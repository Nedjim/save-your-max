import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.id; // Supabase userId

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) return false;

    req.profile = profile;
    return true;
  }
}
