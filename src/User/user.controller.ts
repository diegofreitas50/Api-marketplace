import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { LoggedUser } from 'src/Auth/loggerd-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('create-user')
  @Post('create')
  @ApiOperation({ summary: 'Criar um usuário' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiTags('user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('find')
  @ApiOperation({ summary: 'Listar todos os usuários. Somente para Admin.' })
  findAll(@LoggedUser() user: User) {
    return this.userService.findAll(user);
  }

  @ApiTags('user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Visualizar um usuário pelo Id. Somente para Admin.' })
  findOne(@LoggedUser() user: User, @Param('id') id: string) {
    return this.userService.findOne(user, id);
  }

  @ApiTags('user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Editar um usuário pelo id. Somente para Admin.' })
  update(@LoggedUser() user: User, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user, id, updateUserDto);
  }

  @ApiTags('user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({
    summary: 'Remover um usuário pelo id. Somente para Admin.',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    return this.userService.delete(user, id);
  }
}
