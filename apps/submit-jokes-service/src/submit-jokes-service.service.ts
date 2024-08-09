import { Injectable } from '@nestjs/common';

@Injectable()
export class SubmitJokesServiceService {
  getHello(): string {
    return 'Hello World! - This is the submit-jokes-service';
  }
}
