import { Test, TestingModule } from '@nestjs/testing';
import { CryptoExchangesController } from './crypto-exchanges.controller';
import { CryptoExchangesService } from './crypto-exchanges.service';
import { LISTED_COINTS } from '../constant';

describe('CryptoExchangesController', () => {
  let controller: CryptoExchangesController;
  let service: CryptoExchangesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoExchangesController],
      providers: [
        {
          provide: CryptoExchangesService,
          useValue: {
            getTokens: jest.fn(),
            getPrices: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CryptoExchangesController>(
      CryptoExchangesController,
    );
    service = module.get<CryptoExchangesService>(CryptoExchangesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTokens', () => {
    it('should call getTokens method of CryptoExchangesService', async () => {
      jest.spyOn(service, 'getTokens').mockReturnValueOnce(LISTED_COINTS);

      const result = await controller.getTokens();

      expect(result).toEqual(LISTED_COINTS);
      expect(service.getTokens).toHaveBeenCalled();
    });
  });

  describe('getPrices', () => {
    it('should call getPrices method of CryptoExchangesService with correct parameters', async () => {
      const token = { ids: 'bitcoin', currency: 'eth' };
      const prices = {
        bitcoin: {
          eth: 18.830146,
        },
      };

      jest
        .spyOn(service, 'getPrices')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockReturnValueOnce(Promise.resolve(prices));

      const result = await controller.getPrices(token.ids, token.currency);

      expect(result).toEqual(prices);
      expect(service.getPrices).toHaveBeenCalledWith(token);
    });
  });
});
