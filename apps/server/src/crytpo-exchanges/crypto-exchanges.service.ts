import { HttpService } from '@nestjs/axios';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { LISTED_COINTS } from '../constant';
import { Token } from 'src/dtos/token.response';

@Injectable()
export class CryptoExchangesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getTokens(): Token[] {
    return LISTED_COINTS;
  }

  async getPrices(token: {
    ids: string;
    currency: string;
  }): Promise<Record<string, Record<string, string>>> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<Record<string, Record<string, string>>>(
          `${this.configService.get<string>('URI')}simple/price?ids=${
            token.ids
          }&vs_currencies=${token.currency}`,
        )
        .pipe(
          catchError((error) => {
            throw new BadGatewayException(`upstream error: ${error.message}`);
          }),
        ),
    );

    return data;
  }
}
