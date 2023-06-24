import { ApiProperty } from '@nestjs/swagger';

export class AvaliacaoDTO {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  ST_avaliacao: number;
}
