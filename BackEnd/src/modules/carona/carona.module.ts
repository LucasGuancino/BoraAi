import { Module } from '@nestjs/common';
import { CaronaController } from '../carona/carona.controller';
import { CaronaService } from './carona.service';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [CaronaController],
  providers: [CaronaService, PrismaService],
})
export class CaronaModule {}
