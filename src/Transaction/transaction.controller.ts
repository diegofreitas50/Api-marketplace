import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionService } from 'src/Transaction/transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Transaction} from 'src/Transaction/entities/transaction.entity';
import { LoggedUser } from 'src/Auth/loggerd-user.decorator';

@Controller('Transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiTags('Transaction')
  @Post('create')
  @ApiOperation({ summary: 'Executar transação' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiTags('User')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('find')
  @ApiOperation({ summary: 'Listar todos os usuários.' })
  findAll() {
    return this.userService.findAll();
  }

  @ApiTags('User')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Visualizar um usuário pelo Id.' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiTags('User')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Editar dados do usuário logado' })
  update(@LoggedUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    updateUserDto.id = user.id;
    return this.userService.update(user, updateUserDto);
  }

  @ApiTags('User')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({
    summary: 'Remove usuário logado. Apenas para ADM',
  })
  delete(@LoggedUser() user: User) {
    return this.userService.delete(user);
  }
}
