import { Injectable } from '@nestjs/common';

@Injectable()
export class ModerateJokesServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
