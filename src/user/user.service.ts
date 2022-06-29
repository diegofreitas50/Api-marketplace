import {
    BadRequestException,
    HttpException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { CreateUserDto } from './dto/create-user-dto';
  import { User } from './entities/user.entity';
  import { PrismaService } from '../prisma/prisma.service';
  import { UpdateUserDto } from './dto/update-user-dto';
  import * as bcrypt from 'bcrypt';

  @Injectable()
  export class UserService {
    private userSelect = {
      id: true,
      name: true,
      email: true,
      password: false,
      isAdmin: true,
      createdAt: true,
      updatedAt: true,
    };

    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateUserDto){
      if (dto.password !== dto.confirmPassword) {
        throw new BadRequestException('As senhas não correspondem.');
      }

      delete dto.confirmPassword;

      const data: User = {
        ...dto,
        password: await bcrypt.hash(dto.password, 10),
      };

      return this.prisma.user
        .create({ data, select: this.userSelect })
        .catch(this.handleError);
    }

    async findAll(){
      const list = await this.prisma.user.findMany({
        select: this.userSelect,
      });

      if (list.length === 0) {
        throw new NotFoundException('Não há usuários cadastrados.');
      }
      return list;
    }

    async findOne(id: string) {
      const record = await this.prisma.user.findUnique({
        where: { id },
        select: this.userSelect,
      });

      if (!record) {
        throw new NotFoundException(`Usuário do Id: '${id}' não existente. `);
      }

      return record;
    }

    async update(id: string, dto: UpdateUserDto){
      await this.findOne(id);

      if (dto.password) {
        if (dto.password != dto.confirmPassword) {
          throw new BadRequestException('As senhas não correspondem.');
        }
      }

      delete dto.confirmPassword;

      const data: Partial<User> = { ...dto };

      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      return this.prisma.user
        .update({
          where: { id },
          data,
          select: this.userSelect,
        })
        .catch(this.handleError);
    }

    async delete(id: string) {
      await this.findOne(id);

      await this.prisma.user.delete({
        where: { id },
      });
      throw new HttpException('', 204);
    }

    handleError(error: Error): undefined {
      const errorLines = error.message?.split('\n');
      const lastErrorLine = errorLines[errorLines.length - 1].trim();
      throw new BadRequestException(
        lastErrorLine || 'Erro no processamento! Favor recarregar a página.',
      );
    }
  }
