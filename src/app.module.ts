import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './User/user.module';
import { CategoryModule } from './Category/category.module';
import { BagModule } from './bag/bag.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, CategoryModule, BagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
