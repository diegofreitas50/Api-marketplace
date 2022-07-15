import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './User/user.module';
import { CategoryModule } from './Category/category.module';
import { BagModule } from './bag/bag.module';
import { ProductModule } from './Product/product.module';
import { Transaction } from './Transaction/entities/transaction.entity';

@Module({
  imports: [PrismaModule,AuthModule, UserModule,ProductModule,CategoryModule, BagModule,Transaction],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
