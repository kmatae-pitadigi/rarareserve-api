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

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
