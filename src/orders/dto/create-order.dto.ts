import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ example: '2434', description: 'ID do produto' })
  @IsString()
  idItem: string;

  @ApiProperty({ example: 1, description: 'Quantidade comprada' })
  @IsNumber()
  quantidadeItem: number;

  @ApiProperty({
    example: 1000,
    description: 'Valor unitário do item (em centavos)',
  })
  @IsNumber()
  valorItem: number;
}

export class CreateOrderDto {
  @ApiProperty({
    example: 'v10089015vdb-01',
    description: 'Número único do pedido',
  })
  @IsString()
  numeroPedido: string;

  @ApiProperty({
    example: 10000,
    description: 'Valor total do pedido (em centavos)',
  })
  @IsNumber()
  valorTotal: number;

  @ApiProperty({
    example: '2023-07-19T12:24:11.5299601+00:00',
    description: 'Data de criação',
  })
  @IsDateString()
  dataCriacao: string;

  @ApiProperty({
    type: [CreateItemDto],
    description: 'Lista de itens do pedido',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemDto)
  items: CreateItemDto[];
}
