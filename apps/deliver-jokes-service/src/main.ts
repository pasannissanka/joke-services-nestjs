import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DeliverJokesServiceModule } from './deliver-jokes-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
} from '../../../libs/common/src';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(DeliverJokesServiceModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
  });

  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Deliver jokes API')
    .setDescription('The deliver jokes Microservice API')
    .setVersion('1.0')
    .addTag('jokes')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: parseInt(config.get('DELIVER_SVC_TCP_PORT')),
    },
  });

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.startAllMicroservices();

  await app.listen(config.get('DELIVER_SVC_PORT'));
}
bootstrap();
