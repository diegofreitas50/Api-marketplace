import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  prisma: any;
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(user: User) {
    return `This action returns all user`;
  }

  async findOne(user: User, id: string) {
    // isAdmin(user)
    return await this.prisma.user.findUnique({
      where:{id}
    });
  }

  update(user: User, id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  delete(user: User, id: string) {
    return `This action removes a #${id} user`;
  }
}
