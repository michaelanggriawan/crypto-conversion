import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) api/tokens', () => {
    return request(app.getHttpServer())
      .get('/api/tokens')
      .expect(HttpStatus.OK);
  });

  it('/ (GET) api/tokens/prices', () => {
    return request(app.getHttpServer())
      .get('/api/tokens/prices?ids=bitcoin&currency=eth')
      .expect(HttpStatus.OK);
  });
});
