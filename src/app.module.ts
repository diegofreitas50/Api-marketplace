import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './User/user.module';
import { CategoryModule } from './Category/category.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
