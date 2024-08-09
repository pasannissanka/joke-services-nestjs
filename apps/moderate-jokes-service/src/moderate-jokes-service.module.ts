import { Module } from '@nestjs/common';
import { ModerateJokesServiceController } from './moderate-jokes-service.controller';
import { ModerateJokesServiceService } from './moderate-jokes-service.service';

@Module({
  imports: [],
  controllers: [ModerateJokesServiceController],
  providers: [ModerateJokesServiceService],
})
export class ModerateJokesServiceModule {}
