import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { AvaliacaoDTO } from './avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(private prisma: PrismaService) {}

  async obterMediaAvaliacoesPorUsuario(userId: number): Promise<number> {
    const userIdInt = parseInt(userId.toString(), 10); // Converter para número inteiro

    const avaliacoesUsuario = await this.prisma.user.findUnique({
      where: {
        id: userIdInt,
      },
      include: {
        avaliacoes: true,
      },
    });

    const totalAvaliacoes = avaliacoesUsuario.avaliacoes.length;
    const somaAvaliacoes = avaliacoesUsuario.avaliacoes.reduce(
      (total, avaliacao) => total + avaliacao.ST_avaliacao,
      0,
    );

    if (totalAvaliacoes > 0) {
      const mediaAvaliacoes = somaAvaliacoes / totalAvaliacoes;
      return parseFloat(mediaAvaliacoes.toFixed(1)); // Arredonda para uma casa decimal
    } else {
      // Caso não haja avaliações, retorne um valor padrão ou uma mensagem indicando a ausência de avaliações.
      return 0; // Valor padrão (0) quando não há avaliações
      // ou
      // throw new NotFoundException('Nenhuma avaliação encontrada'); // Lança uma exceção informando que não há avaliações
    }
  }

  async processarAvaliacao(avaliacaoDTO: AvaliacaoDTO) {
    const { userId, ST_avaliacao } = avaliacaoDTO;

    // Obtendo as avaliações do usuário
    const avaliacoesUsuario = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        avaliacoes: true,
      },
    });

    const totalAvaliacoes = avaliacoesUsuario.avaliacoes.length;
    const somaAvaliacoes = avaliacoesUsuario.avaliacoes.reduce(
      (total, avaliacao) => total + avaliacao.ST_avaliacao,
      0,
    );

    const mediaAvaliacoes =
      (somaAvaliacoes + ST_avaliacao) / (totalAvaliacoes + 1);

    // Salvando nova avaliação
    const novaAvaliacao = await this.prisma.avaliacao.create({
      data: {
        userId,
        ST_avaliacao,
      },
    });

    return novaAvaliacao;
  }
}
