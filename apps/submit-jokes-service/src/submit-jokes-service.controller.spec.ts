import { Test, TestingModule } from '@nestjs/testing';
import { SubmitJokesServiceController } from './submit-jokes-service.controller';
import { SubmitJokesServiceService } from './submit-jokes-service.service';

describe('SubmitJokesServiceController', () => {
  let submitJokesServiceController: SubmitJokesServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SubmitJokesServiceController],
      providers: [SubmitJokesServiceService],
    }).compile();

    submitJokesServiceController = app.get<SubmitJokesServiceController>(
      SubmitJokesServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(submitJokesServiceController.getHello()).toBe('Hello World!');
    });
  });
});
