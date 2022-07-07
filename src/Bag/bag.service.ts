import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBagDto } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';

@Injectable()
export class BagService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBagDto: CreateBagDto) {
    const data: Prisma.BagCreateInput = {
      product: { connect: { id: createBagDto.productId } },
      user: {connect: {id: createBagDto.userId}},
    }
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
