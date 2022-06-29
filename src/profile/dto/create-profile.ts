import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsUUID, Length } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @Length(3, 12)
  @ApiProperty({
    description: 'Nome ',
    example: 'Fernanda',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Categoria',
    example:
      'NoAdmin',
  })
  imageUrl: string;


}
