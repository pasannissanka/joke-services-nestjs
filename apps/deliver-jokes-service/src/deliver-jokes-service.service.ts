import { Injectable } from '@nestjs/common';

@Injectable()
export class DeliverJokesServiceService {
  getHello(): string {
    return 'Hello World! This is the deliver-jokes-service';
  }
}
