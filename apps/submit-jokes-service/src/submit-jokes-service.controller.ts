import { Controller, Get } from '@nestjs/common';
import { SubmitJokesServiceService } from './submit-jokes-service.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health checks')
@Controller()
export class SubmitJokesServiceController {
  constructor(
    private readonly submitJokesServiceService: SubmitJokesServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.submitJokesServiceService.getHello();
  }
}
