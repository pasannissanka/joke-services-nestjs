import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SubmitJokesServiceModule } from './submit-jokes-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
} from '../../../libs/common/src';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(SubmitJokesServiceModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
  });

  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Submit jokes API')
    .setDescription('The submit jokes Microservice API')
    .setVersion('1.0')
    .addTag('jokes')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: config.get('SUBMIT_SVC_HOST'),
      port: parseInt(config.get('SUBMIT_SVC_TCP_PORT')),
    },
  });

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.startAllMicroservices();

  await app.listen(config.get('SUBMIT_SVC_PORT'));
}
bootstrap();
