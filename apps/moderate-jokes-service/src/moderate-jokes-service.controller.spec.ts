import { Test, TestingModule } from '@nestjs/testing';
import { ModerateJokesServiceController } from './moderate-jokes-service.controller';
import { ModerateJokesServiceService } from './moderate-jokes-service.service';

describe('ModerateJokesServiceController', () => {
  let moderateJokesServiceController: ModerateJokesServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ModerateJokesServiceController],
      providers: [ModerateJokesServiceService],
    }).compile();

    moderateJokesServiceController = app.get<ModerateJokesServiceController>(
      ModerateJokesServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(moderateJokesServiceController.getHello()).toBe('Hello World!');
    });
  });
});
