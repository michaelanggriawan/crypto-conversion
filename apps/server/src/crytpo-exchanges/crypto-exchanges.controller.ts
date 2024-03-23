import { Controller, Get, Query } from '@nestjs/common';
import { CryptoExchangesService } from './crypto-exchanges.service';

@Controller({
  version: '1',
  path: 'api/tokens',
})
export class CryptoExchangesController {
  constructor(
    private readonly cryptoExchangesService: CryptoExchangesService,
  ) {}

  @Get()
  getTokens() {
    return this.cryptoExchangesService.getTokens();
  }

  @Get('/prices')
  getPrices(@Query('ids') ids: string, @Query('currency') currency: string) {
    return this.cryptoExchangesService.getPrices({
      ids,
      currency,
    });
  }
}
