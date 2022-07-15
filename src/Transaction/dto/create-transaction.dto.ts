import { ApiProperty } from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class CreateTransactionDto {
  @IsString()
  @ApiProperty({
    description: 'Débito ou crédito',
    example: 'debito',
  })
  methodOfPayment:string;

  @IsNumber()
  @ApiProperty({
    description:
      'Número de parcelas, caso seja na função crédito',
    example: '3',
  })
  installments:number;
}
