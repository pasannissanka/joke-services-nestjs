import { NestFactory } from '@nestjs/core';
import { SubmitJokesServiceModule } from './submit-jokes-service.module';

async function bootstrap() {
  const app = await NestFactory.create(SubmitJokesServiceModule);
  await app.listen(8003);
}
bootstrap();
