import { NestFactory } from '@nestjs/core';
import { SubmitJokesServiceModule } from './submit-jokes-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  await app.listen(8003);
}
bootstrap();
