import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { VeiculoDTO } from './veiculo.dto';
import { UserDTO } from '../user/user.dto';

@Injectable()
export class VeiculoService {
  constructor(private prisma: PrismaService) { }

  async create(veiculoDto: VeiculoDTO, userData: UserDTO) {

    const userExists = await this.prisma.user.findFirst({
      where: {
        ra: userData.ra,
      },
    });

    if (userExists) {


      const newVeiculo = await this.prisma.veiculo.create({
        data: {
          nome_veiculo: veiculoDto.nome_veiculo,
          placa_veiculo: veiculoDto.placa_veiculo,
          desc_veiculo: veiculoDto.desc_veiculo,
        },
      });
    }
  }

  async findAll() {
    return this.prisma.veiculo.findMany();
  }

  async findById(id: number) {
    return this.prisma.veiculo.findUnique({
      where: { id, },
    });
  }

  async update(id: number, veiculoDto: VeiculoDTO, userDto: UserDTO) {
    const { nome_veiculo, placa_veiculo, desc_veiculo } = veiculoDto;
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (userExists) {


      return this.prisma.veiculo.update({
        where: { id, },
        data: {
          nome_veiculo: veiculoDto.nome_veiculo,
          placa_veiculo: veiculoDto.placa_veiculo,
          desc_veiculo: veiculoDto.desc_veiculo,
        },
      });
    }
  }

  async delete(id: number) {
    return this.prisma.veiculo.delete({
      where: { id, },
    });
  }
}
