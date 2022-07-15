import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { LoggedUser } from 'src/Auth/loggerd-user.decorator';
import { User } from 'src/User/entities/user.entity';
import { BagService } from './bag.service';
import { CreateBagDto } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';
import { Bag, Product } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Bag')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('Bag')
export class BagController {
  constructor(private readonly bagService: BagService) {}

  @Post()
  @ApiOperation({
    summary: 'Incluir um produto a sua Bag',
  })
  create(@LoggedUser() user: User, @Body() createBagDto: CreateBagDto) {
    return this.bagService.create(user, createBagDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar uma de suas transações (Bag).'
  })
  findOne(@LoggedUser() user:User) {
    return this.bagService.findOne(user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  @ApiOperation({
    summary:'Para incluir produtos na bag'
  })
  addProduct(@LoggedUser() user:User,@Body() createBagDto: CreateBagDto){
    return this.bagService.addProduct(user,createBagDto);
  }
}
