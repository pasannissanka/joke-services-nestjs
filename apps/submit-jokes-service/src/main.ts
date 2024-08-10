import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SubmitJokesServiceModule } from './submit-jokes-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
} from '../../../libs/common/src';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(SubmitJokesServiceModule);

  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Submit jokes API')
    .setDescription('The submit jokes Microservice API')
    .setVersion('1.0')
    .addTag('jokes')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(config.get('SUBMIT_SVC_PORT'));
}
bootstrap();
