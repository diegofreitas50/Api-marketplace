import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
=======
import { AuthModule } from './Auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './User/user.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule],
>>>>>>> origin/development
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
