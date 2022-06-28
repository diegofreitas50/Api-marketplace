import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export function isAdmin(user: User, id: string) {
  if (user.id === id) {
    throw new UnauthorizedException('Você não tem permissão.');
  }
}
