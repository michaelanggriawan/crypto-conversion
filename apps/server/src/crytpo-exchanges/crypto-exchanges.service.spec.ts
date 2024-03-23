import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CryptoExchangesService } from './crypto-exchanges.service';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Token } from 'src/dtos/token.response';
import { LISTED_COINTS } from '../constant';

describe('CryptoExchangesService', () => {
  let service: CryptoExchangesService;
  let httpServiceMock: HttpService;
  let configServiceMock: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CryptoExchangesService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => of({ data: [] })), // Mocking the get method to return an Observable with an empty array
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CryptoExchangesService>(CryptoExchangesService);
    httpServiceMock = module.get<HttpService>(HttpService);
    configServiceMock = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTokens', () => {
    it('should return tokens', async () => {
      jest
        .spyOn(httpServiceMock, 'get')
        .mockReturnValueOnce(
          of({ data: LISTED_COINTS } as AxiosResponse<Token[]>),
        );

      const result = await service.getTokens();

      expect(result).toEqual(LISTED_COINTS);
    });
  });

  describe('getPrices', () => {
    it('should return prices', async () => {
      const token = { ids: 'bitcoin', currency: 'eth' };
      const prices = {
        bitcoin: {
          eth: 18.830146,
        },
      };
      jest
        .spyOn(httpServiceMock, 'get')
        .mockReturnValueOnce(of({ data: prices } as AxiosResponse<any>));

      const result = await service.getPrices(token);

      expect(result).toEqual(prices);
    });
  });
});
