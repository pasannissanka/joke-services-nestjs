import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ModerateJokesServiceModule } from './moderate-jokes-service.module';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
} from '../../../libs/common/src';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ModerateJokesServiceModule);

  const config = app.get(ConfigService);

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(config.get('MODERATE_SVC_PORT'));
}
bootstrap();
