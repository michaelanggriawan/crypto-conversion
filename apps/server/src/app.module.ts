import { Module } from '@nestjs/common';
import { CryptoExchangesModule } from './crytpo-exchanges/crypto-exchanges.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    CryptoExchangesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
