import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ModerateJokesServiceModule } from './moderate-jokes-service.module';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
} from '../../../libs/common/src';

async function bootstrap() {
  const app = await NestFactory.create(ModerateJokesServiceModule);

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(8002);
}
bootstrap();
