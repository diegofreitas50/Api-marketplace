import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/User/entities/user.entity';
import { handleError } from 'src/utils/handleError.utils';
import { isOwner } from 'src/utils/is-owner.utils';
import { CreateBagDto } from './dto/create-bag.dto';

@Injectable()
export class BagService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, createBagDto: CreateBagDto) {
    const data: Prisma.BagCreateInput = {
      product: { connect: { id: createBagDto.productId } },
      user: { connect: { id: user.id } },
    };

    return await this.prisma.bag
      .create({
        data,
        select: {
          id: true,
          user: { select: { id: true, name: true } },
          product: {
            select: { id: true, title: true, imgURL: true, price: true },
          },
        },
      })
      .catch(handleError);
  }

  async findAll(user: User) {
    const allBags = await this.prisma.bag.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        user: { select: { id: true, name: true } },
        product: { select: { id: true, title: true, new: true, price: true } },
      },
    });

    if (allBags.length === 0) {
      throw new NotFoundException('Não há registros de transações (Bag)');
    }

    return allBags;
  }

  async findOne(id: string, user: User) {
    const data = await this.prisma.bag.findUnique({
      where: { id },
      select: {
        id: true,
        user: { select: { id: true, name: true } },
        product: { select: { id: true, title: true, new: true, price: true } },
      },
    });

    const userIdFromBag = data.user.id;
    isOwner(user, userIdFromBag);

    if (!data) {
      throw new NotFoundException(`Registro com id '${id}' não encontrado.`);
    }

    return data;
  }

  async delete(user: User, id: string) {
    const userIdFromBag = await this.prisma.bag.findUnique({ where: { id } });

    isOwner(user, userIdFromBag.userId);

    await this.prisma.bag.delete({ where: { id } });

    return `This action removes a bag id: #${id} `;
  }
}
