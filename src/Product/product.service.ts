import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product} from './entities/product.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { error } from 'console';
//import { handleError } from 'src/Utils/handle-error.util';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {

  constructor(private readonly prisma: PrismaService) {}

    findAll() {
      return this.prisma.product.findMany()
    }

    findById(id: string){
      const record = this.prisma.product.findUnique({
        where: { id },
      });

      if (!record) {
        throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
      }
      return record;
    }

  async findOne(id: string){
    return await this.prisma.product.findUnique({where: {id}})
    }

  create(dto: CreateProductDto) {

    const data: Prisma.ProductCreateInput = {
        title:dto.title,
        description:dto.description,
        imgURL:dto.imgURL,
        new:dto.new,
        price:dto.price,

      Category: {
        connect: {
          id: dto.product.map((categoryID) => ({
            id: categoryID,
            })),
        }
      },
    }

    return this.prisma.product
      .create({
        data,
        select: {
            title:true,
            description:true,
            imgURL:true,
            new:true,
            price:true,

          Category: {
            Selec: {
                title:true
            }
          }
      }).catch(handleError);
  }

   update(id: string,dto:UpdateProductDto){
   this.findById(id)
    const data: Prisma.ProductUpdateInput = {
        select:{
            title:dto.title,
            description:dto.description,
            imgURL:dto.imgURL,
            new:dto.new,
            price:dto.price,

            Category: {
                connect: {
                id: dto.product.map((categoryID) => ({
                id: categoryID,
            })),
        }
      },
    }

    return this.prisma.product
      .update({
        where:{id},
        data,
        select: {
            title:true,
            description:true,
            imgURL:true,
            new:true,
            price:true,

          Category: {
            Selec: {
                title:true
            }
          }
      }).catch(handleError);
    }

    async delete(id: string) {
      await this.findById(id);

      await this.prisma.game.delete({ where: { id } });
    }

}
