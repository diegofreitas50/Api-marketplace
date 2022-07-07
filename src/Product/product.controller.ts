import { Body,Controller, Get,Post,Res,Param,Patch,Delete,HttpCode,HttpStatus, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags,ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { userInfo } from 'os';
import { exit } from 'process';
import { ProductService } from 'src/Product/product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('Product')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('Product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os produtos',
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Localizar um produto',
  })
  findOne(@Param('id') id: string){
     return this.productService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Adicionar um produto',
  })
  create(@Body() createGameDto: CreateProductDto) {

    return this.productService.create(createGameDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Alterar dados de um produto',
  })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto){

    return this.productService.update(id,dto);
  }


  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um produto"',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    this.productService.delete(id);
  }
}
