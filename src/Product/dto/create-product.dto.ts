import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsUrl } from 'class-validator';

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

  @IsUrl()
  @IsString()
  @ApiProperty({
    example: 'Url relacionada a foto do produto',
  })
  imgURL: string;

  @IsBoolean()
  @ApiProperty({
    example: 'true or false',
  })
  new: boolean;

  @IsNumber()
  @ApiProperty({
    example: '20.30',
  })
  price: number;

  @IsString()
  @ApiProperty({
    example: '0c4b59bb-e169-40a4-81f5-4c34d2c2ca4b',
  })
  userID: string;

  @IsString()
  @ApiProperty({
    example: '0c4b59bb-e169-40a4-81f5-4c34d2c2ca4b',
  })
  categoryID?: string;
}
