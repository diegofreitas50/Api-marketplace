import { Module } from '@nestjs/common';
<<<<<<< HEAD

@Module({})
=======
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
>>>>>>> origin/development
export class PrismaModule {}
