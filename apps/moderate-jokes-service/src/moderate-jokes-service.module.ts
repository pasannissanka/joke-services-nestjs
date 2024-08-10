import { Module } from '@nestjs/common';
import { ModerateJokesServiceController } from './moderate-jokes-service.controller';
import { ModerateJokesServiceService } from './moderate-jokes-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ModerateJokesServiceController],
  providers: [ModerateJokesServiceService],
})
export class ModerateJokesServiceModule {}
