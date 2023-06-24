import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CaronaService } from './carona.service';
import { CaronaDTO } from './carona.dto';

@Controller('Carona')
@ApiTags('Carona')
export class CaronaController {
  constructor(private readonly caronaService: CaronaService) {}

  @Post(':id/pegar')
  @ApiOperation({ summary: 'Solicitar uma carona' })
  @ApiParam({ name: 'id', description: 'ID da carona' })
  @ApiCreatedResponse({ description: 'Carona solicitada com sucesso' })
  async pegarCarona(@Param('id') id: string, @Body('userId') userId: string) {
    const caronaId = parseInt(id);
    const userIdParsed = parseInt(userId);

    return this.caronaService.takeCarona(caronaId, userIdParsed);
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova carona' })
  @ApiCreatedResponse({ description: 'Carona criada com sucesso' })
  async create(@Body() data: CaronaDTO) {
    return this.caronaService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todas as caronas' })
  @ApiCreatedResponse({ description: 'Caronas obtidas com sucesso' })
  async findAll() {
    return this.caronaService.findAll();
  }

  @Get('ativa')
  @ApiOperation({ summary: 'Obter caronas ativas' })
  @ApiCreatedResponse({ description: 'Caronas ativas obtidas com sucesso' })
  async findActiveCaronas() {
    return this.caronaService.findActiveCaronas();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma carona' })
  @ApiParam({ name: 'id', description: 'ID da carona' })
  @ApiCreatedResponse({ description: 'Carona atualizada com sucesso' })
  async update(@Param('id') id: string, @Body() data: CaronaDTO) {
    return this.caronaService.update(parseInt(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma carona' })
  @ApiParam({ name: 'id', description: 'ID da carona' })
  @ApiCreatedResponse({ description: 'Carona excluída com sucesso' })
  async delete(@Param('id') id: string) {
    return this.caronaService.delete(parseInt(id));
  }

  @Get('pendentes/:userId')
  @ApiOperation({ summary: 'Obter caronas pendentes de um usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiCreatedResponse({ description: 'Caronas pendentes obtidas com sucesso' })
  async getCaronasPendentes(@Param('userId') userId: string) {
    return this.caronaService.findPendentesByUserId(parseInt(userId));
  }

  @Post(':caronaId/confirmar/:userId')
  @ApiOperation({ summary: 'Confirmar uma carona' })
  @ApiParam({ name: 'caronaId', description: 'ID da carona' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiCreatedResponse({ description: 'Carona confirmada com sucesso' })
  async confirmarCarona(
    @Param('caronaId') caronaId: string,
    @Param('userId') userId: string,
  ) {
    try {
      const carona = await this.caronaService.confirmCarona(
        parseInt(caronaId),
        parseInt(userId),
      );
      return { message: 'Carona confirmada com sucesso', carona };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Post(':caronaId/cancelar')
  @ApiOperation({ summary: 'Cancelar uma carona' })
  @ApiParam({ name: 'caronaId', description: 'ID da carona' })
  @ApiCreatedResponse({ description: 'Carona cancelada com sucesso' })
  async cancelarCarona(@Param('caronaId') caronaId: string) {
    try {
      const carona = await this.caronaService.cancelarCarona(
        parseInt(caronaId),
      );
      return { message: 'Carona cancelada com sucesso', carona };
    } catch (error) {
      return { error: error.message };
    }
  }
}
