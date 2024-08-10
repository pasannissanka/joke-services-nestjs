import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SubmitJokesServiceModule } from './submit-jokes-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
} from '../../../libs/common/src';

async function bootstrap() {
  const app = await NestFactory.create(SubmitJokesServiceModule);

  const config = new DocumentBuilder()
    .setTitle('Submit jokes API')
    .setDescription('The submit jokes Microservice API')
    .setVersion('1.0')
    .addTag('jokes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(8003);
}
bootstrap();
