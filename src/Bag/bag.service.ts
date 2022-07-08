import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/User/entities/user.entity';
import { handleError } from 'src/utils/handleError.utils';
import { CreateBagDto } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';

@Injectable()
export class BagService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, createBagDto: CreateBagDto) {
    const data: Prisma.BagCreateInput = {
      product: { connect: { id: createBagDto.productId } },
      user: { connect: user },
    };

    data.product

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

  findAll() {
    return `This action returns all bag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bag`;
  }

  update(id: number, updateBagDto: UpdateBagDto) {
    return `This action updates a #${id} bag`;
  }

  remove(id: number) {
    return `This action removes a #${id} bag`;
  }
}
