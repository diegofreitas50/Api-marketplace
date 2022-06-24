import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NomeDaPastaModule } from './nome-da-pasta/nome-da-pasta.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [NomeDaPastaModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
