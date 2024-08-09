import { Controller, Get } from '@nestjs/common';
import { ModerateJokesServiceService } from './moderate-jokes-service.service';

@Controller()
export class ModerateJokesServiceController {
  constructor(private readonly moderateJokesServiceService: ModerateJokesServiceService) {}

  @Get()
  getHello(): string {
    return this.moderateJokesServiceService.getHello();
  }
}
