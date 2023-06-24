import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CaronaDTO } from './carona.dto';

@Injectable()
export class CaronaService {
  constructor(private prisma: PrismaService) {}

  async create(caronaDto: CaronaDTO) {
    const { userIdCarona } = caronaDto;

    // Verificar se o usuário possui um veículo cadastrado
    const veiculo = await this.prisma.veiculo.findFirst({
      where: {
        userId: userIdCarona,
      },
    });

    if (!veiculo) {
      throw new NotFoundException(
        'Este usuário não possui um veículo cadastrado.',
      );
    }

    // Verificar se o usuário possui uma carona ativa ou pendente
    const caronasPendentes = await this.findPendentesByUserId(userIdCarona);
    const caronasAtivas = await this.findActiveCaronas();

    if (caronasPendentes.length > 0 || caronasAtivas.length > 0) {
      throw new Error('Você já possui uma carona ativa ou pendente.');
    }

    // Resto do código para criar a carona
    const newCarona = await this.prisma.carona.create({
      data: {
        userIdCarona: caronaDto.userIdCarona,
        end_origem: caronaDto.end_origem,
        hr_saida: caronaDto.hr_saida,
        hr_chegada: caronaDto.hr_chegada,
        met_pagamento: caronaDto.met_pagamento,
        ST_carona: caronaDto.ST_carona,
      },
    });

    // Atualizar caronasFornecidas na tabela hist_caronas
    const histCarona = await this.prisma.hist_caronas.findFirst({
      where: {
        userId: caronaDto.userIdCarona,
      },
    });

    if (histCarona) {
      await this.prisma.hist_caronas.update({
        where: {
          id: histCarona.id,
        },
        data: {
          caronasFornecidas: histCarona.caronasFornecidas + 1,
        },
      });
    }

    return newCarona;
  }

  async findAll() {
    return this.prisma.carona.findMany();
  }

  async findById(id: number) {
    return this.prisma.carona.findUnique({
      where: { id },
    });
  }

  async update(id: number, caronaDto: CaronaDTO) {
    const { end_origem, hr_saida, hr_chegada, met_pagamento, ST_carona } =
      caronaDto;

    return this.prisma.carona.update({
      where: { id },
      data: {
        end_origem,
        hr_saida,
        hr_chegada,
        met_pagamento,
        ST_carona,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.carona.delete({
      where: { id },
    });
  }

  async findActiveCaronas() {
    return this.prisma.carona.findMany({
      where: {
        ST_carona: 'Ativa',
      },
    });
  }

  async updateHistCaronas(userId: number) {
    const histCarona = await this.prisma.hist_caronas.findFirst({
      where: { userId: userId },
    });

    if (!histCarona) {
      throw new Error('HistCarona not found');
    }

    await this.prisma.hist_caronas.update({
      where: { id: histCarona.id },
      data: {
        caronasPegas: histCarona.caronasPegas + 1,
      },
    });
  }

  async takeCarona(caronaId: number, userId: number) {
    const carona = await this.prisma.carona.findUnique({
      where: { id: caronaId },
    });

    if (!carona) {
      throw new Error('Carona not found');
    }

    if (carona.ST_carona !== 'Ativa') {
      throw new Error('Carona is not active');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Verifique se a carona já foi solicitada pelo usuário
    const caronaSolicitada = await this.prisma.carona.findFirst({
      where: {
        id: caronaId,
        solicitanteId: userId,
        ST_carona: 'Pendente',
      },
    });

    if (caronaSolicitada) {
      throw new Error('Carona already requested');
    }

    // Atualizar o usuário associado à carona
    await this.prisma.carona.update({
      where: { id: caronaId },
      data: {
        ST_carona: 'Pendente',
        solicitanteId: userId,
      },
    });

    return carona;
  }

  async confirmCarona(caronaId: number, userId: number) {
    const carona = await this.prisma.carona.findUnique({
      where: { id: caronaId },
    });

    if (!carona) {
      throw new Error('Carona not found');
    }

    if (carona.ST_carona !== 'Pendente' || carona.solicitanteId !== userId) {
      throw new Error('Carona cannot be confirmed');
    }

    // Atualizar o status da carona para "Inativa"
    await this.prisma.carona.update({
      where: { id: caronaId },
      data: {
        ST_carona: 'Inativa',
      },
    });

    // Atualizar o histórico de caronas do usuário solicitante
    await this.updateHistCaronas(userId);

    return carona;
  }

  async cancelarCarona(caronaId: number) {
    const carona = await this.prisma.carona.findUnique({
      where: { id: caronaId },
    });

    if (!carona) {
      throw new Error('Carona not found');
    }

    // Verificar se a carona já está cancelada
    if (carona.ST_carona === 'Cancelada') {
      throw new Error('Carona is already canceled');
    }

    // Atualizar o status da carona para "Ativa" e remover o solicitanteId
    const updatedCarona = await this.prisma.carona.update({
      where: { id: caronaId },
      data: {
        ST_carona: 'Ativa',
        solicitanteId: null,
      },
    });

    return updatedCarona;
  }

  async findPendentesByUserId(userId: number) {
    return this.prisma.carona.findMany({
      where: {
        userIdCarona: userId,
        ST_carona: 'Pendente',
      },
    });
  }
}
