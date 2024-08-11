import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ModerateJokesServiceModule } from './moderate-jokes-service.module';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
} from '../../../libs/common/src';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ModerateJokesServiceModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
  });

  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Moderate jokes API')
    .setDescription('The submit jokes Microservice API')
    .setVersion('1.0')
    .addTag('jokes')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(config.get('MODERATE_SVC_PORT'));
}
bootstrap();
