import { ApiProperty } from '@nestjs/swagger';

export class CaronaDTO {
  @ApiProperty()
  userIdCarona: number;

  @ApiProperty()
  end_origem: string;

  @ApiProperty({ type: Date })
  hr_saida: Date;

  @ApiProperty({ type: Date })
  hr_chegada: Date;

  @ApiProperty()
  met_pagamento: string;

  @ApiProperty()
  ST_carona: string;
}
