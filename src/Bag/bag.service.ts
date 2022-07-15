import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { use } from 'passport';
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
      user: { connect:{id:user.id}},
      product: { connect: { id: createBagDto.productId}},
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

  async findOne(user:User) {
    const data = await this.prisma.bag.findUnique(
      {
        where:{id:user.id},
        select:{
          id:true,
          user:{select:{id:true,name:true}},
          product:{select:{id:true,title:true,new:true,price:true}}}
      });

    if (!data) {
      throw new NotFoundException(`Registro com id '${user.id}' não encontrado.`);
    }else{
      return data;
    }
  }

  async addProduct(user:User,createBagDto:CreateBagDto){
    const selectBag = await this.prisma.bag.findUnique({where:{id:user.id}});
    isOwner(user,selectBag.userId);

    const data: Prisma.BagUpdateInput = {
      user: { connect:{id:user.id}},
      product: { connect: { id: createBagDto.productId}},
    }

    return this.prisma.bag
      .update({
        where:{id:user.id},
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
}
