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
  constructor(private gameService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os jogos',
  })
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Localizar um jogo',
  })
  findOne(@Param('id') id: string){
     return this.gameService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Adicionar um jogo',
  })
  create(@Body() createGameDto: CreateGameDto) {

    return this.gameService.create(createGameDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Alterar dados de um jogo',
  })
  update(@Param('id') id: string, @Body() dto: UpdateGameDto){

    return this.gameService.update(id,dto);
  }


  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um jogo"',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    this.gameService.delete(id);
  }
}
