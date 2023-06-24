import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({ required: false })
  id?: number;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  sobrenome: string;

  @ApiProperty()
  telefone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  senha: string;

  @ApiProperty()
  confirmarSenha: string;
}
