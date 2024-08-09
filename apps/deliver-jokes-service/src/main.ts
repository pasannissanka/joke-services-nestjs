import { NestFactory } from '@nestjs/core';
import { DeliverJokesServiceModule } from './deliver-jokes-service.module';

async function bootstrap() {
  const app = await NestFactory.create(DeliverJokesServiceModule);
  await app.listen(8001);
}
bootstrap();
