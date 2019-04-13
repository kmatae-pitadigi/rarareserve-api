import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as express from 'express';
import * as path from 'path';
import { AppModule } from './app.module';
import * as process from 'process';
import { InitDataSetup } from './init.data.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  // graphql以外のルーティングはAngularで行う
  app.use(express.static(path.join(__dirname, '../client')));
  app.use(/^\/(?!graphql).*/, express.static(path.join(__dirname, '../client/index.html')));

  // 初期値を設定する
  const initDataSetup: InitDataSetup = new InitDataSetup();
  initDataSetup.setup();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
