import { Controller, Get } from '@nestjs/common';
import { DeliverJokesServiceService } from './deliver-jokes-service.service';

@Controller()
export class DeliverJokesServiceController {
  constructor(
    private readonly deliverJokesServiceService: DeliverJokesServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.deliverJokesServiceService.getHello();
  }
}
