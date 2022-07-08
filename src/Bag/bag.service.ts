import { Injectable, NotFoundException } from '@nestjs/common';
import { Bag, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from 'src/Product/entities/product.entity';
import { User } from 'src/User/entities/user.entity';
import { handleError } from 'src/utils/handleError.utils';
import { isAdmin } from 'src/utils/is-admin.util';
import { CreateBagDto } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';

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

  async findAll(): Promise<Bag[]> {
    const allBags = await this.prisma.bag.findMany();

    if (allBags.length === 0) {
      throw new NotFoundException('Não há categorias cadastradas.');
    }

    return allBags;
  }

  async findOne(id: string) {
    const record = await this.prisma.bag.findUnique({
      where: { id },
      select: { id: true, user:true,product:true},
    });

    if (!record) {
      throw new NotFoundException(`Registro com id '${id}' não encontrado.`);
    }

    return record;
  }

  async update(user: User, id: string, updateBagDto: UpdateBagDto) {
    isAdmin(user);

    await this.findOne(id);

    const data: Partial<Bag> = { ...updateBagDto };

    return this.prisma.bag
      .update({ where: { id }, data })
      .catch(handleError);
  }


  async delete(user: User, id: string) {
    isAdmin(user);

    await this.findOne(id);

    await this.prisma.bag.delete({ where: { id } });

    return `This action removes a #${id} category`;
  }
}
