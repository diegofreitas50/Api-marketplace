import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString, IsUUID } from "class-validator";


export class TransactionBagDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do usuário.',
    example: '0c4b59bb-e169-40a4-81f5-4c34d2c2ca4b',
  })
  userId: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id do produto.',
    example: '0c4b59bb-e169-40a4-81f5-4c34d2c2ca4b',
  })
  productId: string;

  @IsString()
  @ApiProperty({
    description: 'Debito ou Crédito',
    example: 'debito',
  })
  methodOfPaymenId: string;

  @IsNumber()
  @ApiProperty({
    description: 'Número de parcelas se for no crédito',
    example: '5',
  })
  installments:number;
}

