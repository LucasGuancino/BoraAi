import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger';
import { AvaliacaoDTO } from './avaliacao.dto';
import { AvaliacaoService } from './avaliacao.service';

@Controller('avaliacao')
@ApiTags('Avaliação')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  @ApiOperation({ summary: 'Processar uma nova avaliação' })
  @ApiCreatedResponse({ description: 'Avaliação processada com sucesso' })
  async processarAvaliacao(@Body() avaliacaoDTO: AvaliacaoDTO) {
    const novaAvaliacao = await this.avaliacaoService.processarAvaliacao(
      avaliacaoDTO,
    );
    return novaAvaliacao;
  }

  @Get('media/:userId')
  @ApiOperation({ summary: 'Obter a média de avaliações de um usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiCreatedResponse({ description: 'Média de avaliações obtida com sucesso' })
  async obterMediaAvaliacoes(@Param('userId') userId: number) {
    const mediaAvaliacoes =
      await this.avaliacaoService.obterMediaAvaliacoesPorUsuario(userId);
    return { mediaAvaliacoes };
  }
}
