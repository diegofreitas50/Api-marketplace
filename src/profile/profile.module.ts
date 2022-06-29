import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from 'src/profile/profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}