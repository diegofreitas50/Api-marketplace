import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    example: 'O pequeno príncipe',
  })
  title: string;

  @IsString()
  @ApiProperty({
    example: 'Livro usado em ótimo estado de conservação',
  })
  description: string;

  @IsUrl()
  @IsString()
  @ApiProperty({
    example: 'https://images-na.ssl-images-amazon.com/images/I/41mbMabCv5L._SX336_BO1,204,203,200_.jpg',
  })
  imgURL: string;

  @IsBoolean()
  @ApiProperty({
    example: false,
  })
  new: boolean;

  @IsNumber()
  @ApiProperty({
    example: 20,
  })
  price: number;

  @IsString()
  @ApiProperty({
    example: '4365af23-64c7-469a-ac61-824306917415',
  })
  userID: string;

  @IsString()
  @ApiProperty({
    example: '5a524af3-7fed-4d3d-8cec-87b8bd76384b',
  })
  categoryID?: string;
}
