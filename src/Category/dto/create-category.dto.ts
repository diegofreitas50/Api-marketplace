import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateCategoryDto {
  @IsString()
  @ApiProperty({
    description: 'Criar nova categoria.',
    example: 'Eletrônicos'
  })
  title: string;
}
