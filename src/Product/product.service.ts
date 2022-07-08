import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { error } from 'console';
import { Prisma } from '@prisma/client';
import { handleError } from 'src/utils/handleError.utils';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany();
  }

  findById(id: string) {
    const record = this.prisma.product.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }
    return record;
  }

  async findOne(id: string) {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  create(dto: CreateProductDto) {
    const data: Prisma.ProductCreateInput = {
      title: dto.title,
      description: dto.description,
      imgURL: dto.imgURL,
      new: dto.new,
      price: dto.price,
      category: {
        connect: {
          id: dto.categoryID,
        },
      },
      user: {
        connect: { id: dto.userId },
      },
      bag: {
        connect: { id: dto.bagId },
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

          category: {
            select: {
              title: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  update(id: string, dto: UpdateProductDto) {
    this.findById(id);
    const data: Prisma.ProductUpdateInput = {
      title: dto.title,
      description: dto.description,
      imgURL: dto.imgURL,
      new: dto.new,
      price: dto.price,
      category: {
        connect: {
          id: dto.categoryID,
        },
      },
      user: {
        connect: { id: dto.userId },
      },
      bag: {
        connect: { id: dto.bagId },
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

          category: {
            select: {
              title: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.product.delete({ where: { id } });
  }
}
