import { NestFactory } from '@nestjs/core';
import { DeliverJokesServiceModule } from './deliver-jokes-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(DeliverJokesServiceModule);

  const config = new DocumentBuilder()
    .setTitle('Deliver jokes API')
    .setDescription('The deliver jokes Microservice API')
    .setVersion('1.0')
    .addTag('jokes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8001);
}
bootstrap();
