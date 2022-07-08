import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { LoggedUser } from 'src/Auth/loggerd-user.decorator';
import { User } from 'src/User/entities/user.entity';
import { BagService } from './bag.service';
import { CreateBagDto } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';
import { Bag, Product } from '@prisma/client';
import { ApiOperation } from '@nestjs/swagger';

@Controller('bag')
export class BagController {
  constructor(private readonly bagService: BagService) {}

  @Post()
  create(@LoggedUser() user: User, @Body() createBagDto: CreateBagDto) {
    return this.bagService.create(user, createBagDto);
  }

  @Get()
  findAll() {
    return this.bagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bagService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar categoria pelo ID. Somente para Admin.',
  })
  update(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() updateBagDto: UpdateBagDto,
  ): Promise<Bag> {
    return this.bagService.update(user, id, updateBagDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar categoria pelo ID. Somente para Admin.',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    return this.bagService.delete(user, id);
  }
}
