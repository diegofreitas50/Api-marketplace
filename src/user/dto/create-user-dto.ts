import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, MinLength, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @Length(3, 12)
  @ApiProperty({
    description: 'Nome de usuário, precisa conter entre 3 a 12 letras',
    example: 'Patricia',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email de login.',
    example: 'mastergta@yahoo.com',
  })
  email: string;

  @MinLength(6)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'senha fraca - melhor criar outra',
  })
  @ApiProperty({
    description:
      'Letras minúsculas e maiúsculas, número e caracter especial para cadastrar uma nova senha.',
    example: 'Xyz10@2001',
  })
  password: string;

  @ApiProperty({
    description: 'Confirmação de senha deve ser igual a anterior.',
    example: 'Xyz10@2001',
  })
  confirmPassword: string;

  @ApiProperty({
    description: 'Declaração de Administrador.',
    example: false,
  })
  isAdmin: boolean;
}
