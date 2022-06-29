import {
    BadRequestException,
    HttpException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { CreateProfileDto } from './dto/create-profile';
  import { UpdateProfileDto } from './dto/update-profile';
  import { PrismaService } from '../prisma/prisma.service';
  import { Profile } from './entities/profile.entity';
  import { Prisma } from '@prisma/client';

  @Injectable()
  export class ProfileService {
    constructor(private readonly prisma: PrismaService) {}
    private profileSelect = {
      id: true,
      title: true,
      imageUrl: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    };

    async create(UserId:string, dto: CreateProfileDto) {
      const data: Prisma.ProfileCreateInput = { ...dto, user:{connect: {id: UserId}} };

      return this.prisma.profile.create({ data, select: this.profileSelect}).catch(this.handleError);
    }

    async findAll(userId: string) {
      const list = await this.prisma.user.findUnique({
        where: {id: userId},
        select: {profiles:{select:{id:true, title:true, imageUrl:true}}}
      });

      if (list.profiles.length === 0) {
        throw new NotFoundException('Não existem usuarios cadastrados.');
      }
      return list;
    }

    async findOne(userId: string, profileId: string ) {
      const profileUser = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          profiles: {
            where: {
              id: profileId,
            },
          },
        },
      });

      if (profileUser.profiles.length === 0) {
        throw new NotFoundException(
          `Usuario com ID ${profileId} não encontrado na sua conta.`,
        );
      }
      const record = await this.prisma.profile.findUnique({ where: { id:profileId }, include:{games:{select:{game: true}}} });

      if (!record) {
        throw new NotFoundException(
          `O usuario com o Id: '${profileId}' não está cadastrado. `,
        );
      }

      return record;
    }

    async update(userId: string, id: string, dto: UpdateProfileDto) {
      await this.findOne(userId, id);

      const data: Partial<Profile> = { ...dto };

      return this.prisma.profile
        .update({
          where: { id },
          data, select:this.profileSelect,
        })
        .catch(this.handleError);
    }

    async delete(userId: string, id: string) {
      await this.findOne(userId, id);

      await this.prisma.profile.delete({
        where: { id },
      });
      throw new HttpException('', 204);
    }

    handleError(error: Error): undefined {
      const errorLines = error.message?.split('\n');
      const lastErrorLine = errorLines[errorLines.length - 1].trim();

      throw new BadRequestException(
        lastErrorLine || 'Erro no processamento! Favor recarregar a página',
      );
    }
  }
