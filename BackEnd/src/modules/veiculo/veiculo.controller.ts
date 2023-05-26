import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { VeiculoDTO } from './veiculo.dto';
import { UserDTO } from '../user/user.dto';

@Controller('veiculo')
export class VeiculoController {
  constructor(private readonly veiculoService:  VeiculoService) {}

  @Post()
  async create(@Body() data: VeiculoDTO, @Body() data2: UserDTO) {
    return this.veiculoService.create(data,data2);
  }

  @Get()
  async findAll() {
    return this.veiculoService.findAll();
  }
  
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: VeiculoDTO, @Body() data2: UserDTO){
      return this.veiculoService.update(parseInt(id), data, data2);
  }

  @Delete(':id')
  async delete(@Param('id') id: string){
    return this.veiculoService.delete(parseInt(id));
  }
}
