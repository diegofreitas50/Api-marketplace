import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { handleError } from 'src/utils/handleError.utils';
import { isOwner } from 'src/utils/is-owner.utils';
import { User } from 'src/User/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const allProduct = await this.prisma.product.findMany({
      where: { bagID: null },
    });

    if (allProduct.length === 0) {
      throw new NotFoundException('Não há produtos cadastrados.');
    }

    return allProduct;
  }

  async findOne(id: string) {
    const record = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true, title: true, imgURL: true },
    });

    if (!record) {
      throw new NotFoundException(`Registro com id '${id}' não encontrado.`);
    }

    return record;
  }

  create(dto: CreateProductDto, user: User) {
    const data: Prisma.ProductCreateInput = {
      title: dto.title,
      description: dto.description,
      imgURL: dto.imgURL,
      new: dto.new,
      price: dto.price,
      user: {
        connect: {
          id: user.id,
        },
      },
      category: {
        connect: {
          id: dto.categoryID,
        },
      },
    };

    return this.prisma.product
      .create({
        data,
        select: {
          title: true,
          description: true,
          imgURL: true,
          new: true,
          price: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          category: {
            select: {
              title: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  async update(id: string, dto: UpdateProductDto, user: User) {
    const selectProduct = await this.prisma.product.findUnique({
      where: { id },
    });
    isOwner(user, selectProduct.userID);
    this.findOne(id);

    const data: Prisma.ProductUpdateInput = {
      title: dto.title,
      description: dto.description,
      imgURL: dto.imgURL,
      new: dto.new,
      price: dto.price,
      user: {
        connect: {
          id: user.id,
        },
      },
      category: {
        connect: {
          id: dto.categoryID,
        },
      },
    };

    return this.prisma.product
      .update({
        where: { id },
        data,
        select: {
          title: true,
          description: true,
          imgURL: true,
          new: true,
          price: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          category: {
            select: {
              title: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  async delete(id: string, user: User) {
    const selectProduct = await this.prisma.product.findUnique({
      where: { id },
    });
    isOwner(user, selectProduct.userID);

    return await this.prisma.product
      .delete({ where: { id } })
      .catch(handleError);
  }
}
