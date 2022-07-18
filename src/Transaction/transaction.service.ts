import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction} from './entities/transaction.entity';
import * as bcrypt from 'bcrypt';
import { handleError } from 'src/utils/handleError.utils';
import { isAdmin } from 'src/utils/is-admin.utils';
import { Prisma } from '@prisma/client';
import { User } from 'src/User/entities/user.entity';
import { Bag } from 'src/Bag/entities/bag.entity';
import { identity } from 'rxjs';

@Injectable()
export class TransactionService {

  constructor(private readonly prisma: PrismaService) {}


  async create(dto:CreateTransactionDto,user:User) {
    const data: Prisma.TransactionCreateInput = {
      user:{
        connect:{id:user.id}
      },
      installments:dto.installments,
      methodOfPayment:dto.methodOfPaymenId,
      finish:dto.finish
    };

    const userBag = await this.prisma.bag.findMany({where:{id:user.id}});

    return this.prisma.transaction
      .create({
        data,
        select: {
          user:{
            select:{
              id:true,
              name:true,
            }
          }

        },
      })
      .catch(handleError);
  }

  async findAll() {
    const allUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        password: false,
      },
    });

    if (allUsers.length === 0) {
      throw new NotFoundException('Não há usuários cadastrados.');
    }

    return allUsers;
  }

  async findOne(id: string) {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        password: false,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com id '${id}' não encontrado.`);
    }
    return record;
  }

  async update(user: User, updateUserDto: UpdateUserDto) {

    if (updateUserDto.password) {
      if (updateUserDto.password != updateUserDto.confirmPassword) {
        throw new BadRequestException('As senhas informadas não são iguais.');
      }
    }

    delete updateUserDto.confirmPassword;

    const data: Partial<User> = { ...updateUserDto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const id = user.id;

    return this.prisma.user
      .update({ where: { id }, data, select: this.userSelect })
      .catch(handleError);
  }

  async delete(user: User) {
    const id = user.id;
    return await this.prisma.user.delete({ where: { id } });
  }
}
