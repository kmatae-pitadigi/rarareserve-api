import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { InitDataSetup } from './init.data.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  // 初期値を設定する
  const initDataSetup: InitDataSetup = new InitDataSetup();
  initDataSetup.setup();

  const port: number = parseInt(process.env.PORT, 10) || 3000;

  console.info('rarareserver-api started: NODE_ENV: ' + process.env.NODE_ENV + ', PORT: ' + port);

  await app.listen(port);
}
bootstrap();
