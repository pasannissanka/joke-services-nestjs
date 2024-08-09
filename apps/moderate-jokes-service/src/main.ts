import { NestFactory } from '@nestjs/core';
import { ModerateJokesServiceModule } from './moderate-jokes-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ModerateJokesServiceModule);
  await app.listen(8002);
}
bootstrap();
