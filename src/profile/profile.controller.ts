import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
  import { LoggedUser } from 'src/auth/logged-user.decorator';
  import { User } from 'src/user/entities/user.entity';
import { CreateProfileDto } from './dto/create-profile';
  import { UpdateProfileDto } from './dto/update-profile';
  import { Profile } from './entities/profile.entity';
  import { ProfileService } from './profile.service';

  @ApiTags('profile')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Controller('profile')
  export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get()
    @ApiOperation({
      summary: 'Listar todas os usuarios',
    })
    findAll(@LoggedUser() user: User)  {
      return this.profileService.findAll(user.id);
    }

    @Get(':id')
    @ApiOperation({
      summary: 'Visualizar um usuario pelo Id',
    })
    findOne(@LoggedUser() user: User, @Param('id') id: string) {
      return this.profileService.findOne(user.id, id);
    }

    @Post()
    @ApiOperation({
      summary: 'Criar um usuario',
    })
    create(@LoggedUser() user: User, @Body() dto: CreateProfileDto) {
      return this.profileService.create(user.id, dto);
    }

    @Patch(':id')
    @ApiOperation({
      summary: 'Editar um usuario pelo ID',
    })
    update(@LoggedUser() user: User, @Param('id') id: string, @Body() dto: UpdateProfileDto){
      return this.profileService.update(user.id, id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
      summary: 'Remover um usuario pelo ID',
    })
    delete(@LoggedUser() user: User, @Param('id') id: string) {
      this.profileService.delete(user.id, id);
    }
  }

