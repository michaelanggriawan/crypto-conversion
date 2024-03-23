import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { HttpSuccessInterceptor } from './interceptors/success.interceptor';
import { AllExceptionFilter } from './interceptors/error.interceptor';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import 'winston-daily-rotate-file';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            }),
          ),
        }),
      ],
    }),
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter(app.get(Logger)));
  app.useGlobalInterceptors(new HttpSuccessInterceptor());
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  const configService = app.get(ConfigService);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('crypto-exchanges API')
    .setDescription('crypto-exchanges APIs doc')
    .setVersion('1.0')
    .addTag('crypto-exchanges')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/crypto-exchanges/docs', app, document);

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
