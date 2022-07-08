import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    example: 'Livro',
  })
  title: string;

  @IsString()
  @ApiProperty({
    example: 'Escreva a descrição do produto',
  })
  description: string;

  @IsString()
  @ApiProperty({
    example: 'Url relacionada a foto do produto',
  })
  imgURL: string;

  @IsBoolean()
  @ApiProperty({
    example: 'True or False',
  })
  new: boolean;

  @IsNumber()
  @ApiProperty({
    example: '20.30',
  })
  price: number;

  @IsBoolean()
  @ApiProperty({
    example: 'True or False',
  })
  sold: Boolean;

  @IsString()
  @ApiProperty({
    example: 'dslakdjskaldsaldsaklasdaldda',
  })
  categoryID: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário.',
    example: '0c4b59bb-e169-40a4-81f5-4c34d2c2ca4b',
  })
  userId: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'Id da bag.',
    example: '0c4b59bb-e169-40a4-81f5-4c34d2c2ca4b',
  })
  bagId?: string;
}
