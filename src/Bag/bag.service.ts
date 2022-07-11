import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from 'src/Product/entities/product.entity';
import { User } from 'src/User/entities/user.entity';
import { handleError } from 'src/utils/handleError.utils';
import { isAdmin } from 'src/utils/is-admin.utils';
import { isOwner } from 'src/utils/is-owner.utils';
import { CreateBagDto } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';
import { Bag } from './entities/bag.entity';

@Injectable()
export class BagService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, createBagDto: CreateBagDto) {
    const data: Prisma.BagCreateInput = {
      product: { connect: { id: createBagDto.productId}},
      user: { connect: user },
    };

    return await this.prisma.bag.create({
      data,
      select: {
        id: true,
        user: { select: { id: true, name: true } },
        product: {
          select: { id: true, title: true, imgURL: true, price: true },
        },
      },
    }).catch(handleError);
  }

  async findAll(id: string,user): Promise<Bag[]> {
    isOwner(user,id);
    const allBags = await this.prisma.bag.findMany();

    if (allBags.length === 0) {
      throw new NotFoundException('Não há categorias cadastradas.');
    }

    return allBags;
  }

  async findOne(id: string,user) {
    isOwner(user,id);
    const record = await this.prisma.bag.findUnique({
      where: { id },
      select: { id: true,user:true,product:true},
    });

    if (!record) {
      throw new NotFoundException(`Registro com id '${id}' não encontrado.`);
    }

    return record;
  }


  async delete(user: User, id: string) {
    isOwner(user,id);

    await this.prisma.bag.delete({ where: { id } });

    return `This action removes a #${id} category`;
  }
}
