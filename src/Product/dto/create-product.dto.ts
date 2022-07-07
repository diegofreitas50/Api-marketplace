import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString} from "class-validator";

export class CreateProductDto {
  @IsString()
@ApiProperty({
  example:'Livro',
})
  title:string;

  @IsString()
@ApiProperty({
  example:'Escreva a descrição do produto',
})
  description:string;

  @IsString()
@ApiProperty({
  example:'Url relacionada a foto do produto',
})
  imgURL:string

  @IsBoolean()
@ApiProperty({
  example:'True or False',
})
  new:Boolean;

  @IsNumber()
@ApiProperty({
  example:'20.30',
})
  price:number;

  @IsBoolean()
@ApiProperty({
  example:'True or False',
})
  sold:Boolean;

  @IsString()
@ApiProperty({
  example:'dslakdjskaldsaldsaklasdaldda',
})
  categoryID?:String;
}
