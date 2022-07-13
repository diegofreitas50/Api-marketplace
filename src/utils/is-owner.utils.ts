import { UnauthorizedException } from '@nestjs/common';
import { User } from '../User/entities/user.entity';

export function isOwner(user: User,id:string) {
  if (user.id != id) {
    throw new UnauthorizedException('Você não tem permissão para alterar essa transação(Bag)!');
  }
}
