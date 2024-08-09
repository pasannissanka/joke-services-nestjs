import { Module } from '@nestjs/common';
import { SubmitJokesServiceController } from './submit-jokes-service.controller';
import { SubmitJokesServiceService } from './submit-jokes-service.service';

@Module({
  imports: [],
  controllers: [SubmitJokesServiceController],
  providers: [SubmitJokesServiceService],
})
export class SubmitJokesServiceModule {}
