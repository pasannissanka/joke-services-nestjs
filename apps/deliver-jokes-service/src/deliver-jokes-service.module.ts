import { Module } from '@nestjs/common';
import { DeliverJokesServiceController } from './deliver-jokes-service.controller';
import { DeliverJokesServiceService } from './deliver-jokes-service.service';

@Module({
  imports: [],
  controllers: [DeliverJokesServiceController],
  providers: [DeliverJokesServiceService],
})
export class DeliverJokesServiceModule {}
