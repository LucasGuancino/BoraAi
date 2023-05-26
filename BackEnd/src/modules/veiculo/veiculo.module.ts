import { Module } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { VeiculoController } from './veiculo.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [VeiculoController],
  providers: [VeiculoService, PrismaService]
})
export class VeiculoModule {}
