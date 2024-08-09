import { Test, TestingModule } from '@nestjs/testing';
import { DeliverJokesServiceController } from './deliver-jokes-service.controller';
import { DeliverJokesServiceService } from './deliver-jokes-service.service';

describe('DeliverJokesServiceController', () => {
  let deliverJokesServiceController: DeliverJokesServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DeliverJokesServiceController],
      providers: [DeliverJokesServiceService],
    }).compile();

    deliverJokesServiceController = app.get<DeliverJokesServiceController>(
      DeliverJokesServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(deliverJokesServiceController.getHello()).toBe('Hello World!');
    });
  });
});
