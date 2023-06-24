import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CaronaModule } from './modules/carona/carona.module';
import { AvaliacaoModule } from './modules/avaliacao/avaliacao.module';
import { HistCaronasModule } from './modules/histCarona/hist.module';
import { VeiculoModule } from './modules/veiculo/veiculo.module';
@Module({
  imports: [
    UserModule,
    CaronaModule,
    AvaliacaoModule,
    HistCaronasModule,
    VeiculoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
