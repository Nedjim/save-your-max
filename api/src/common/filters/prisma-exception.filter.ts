import { Catch, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError) {
    if (exception.code === 'P2002') {
      throw new ConflictException('This name already exists');
    }

    throw exception;
  }
}
