import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'mastergta@yahoo.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Xyz10@2001',
  })
  password: string;
}
