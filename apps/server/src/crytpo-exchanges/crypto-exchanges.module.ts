import { Logger, Module } from '@nestjs/common';
import { CryptoExchangesController } from './crypto-exchanges.controller';
import { CryptoExchangesService } from './crypto-exchanges.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CryptoExchangesController],
  providers: [CryptoExchangesService, Logger],
})
export class CryptoExchangesModule {}
