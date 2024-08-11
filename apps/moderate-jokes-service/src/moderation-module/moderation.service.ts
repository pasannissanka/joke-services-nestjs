import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateJokeDto,
  JokeDto,
  MessagePatternTypes,
  ResponseDto,
  ResponseStatus,
  Services,
  SubmittedJokeDto,
} from '../../../../libs/types/src';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ModerationService {
  constructor(
    @Inject(Services.DELIVER_JOKES_SERVICE)
    private readonly deliveryServiceClient: ClientProxy,
    @Inject(Services.SUBMIT_JOKES_SERVICE)
    private readonly submitServiceClient: ClientProxy,
  ) {}

  async accept(id: string) {
    const jokeData = await firstValueFrom(
      this.submitServiceClient.send<ResponseDto<SubmittedJokeDto>>(
        MessagePatternTypes.SUBMIT_SVC_GET_NEW_JOKE,
        { id },
      ),
    );

    if (jokeData.status === ResponseStatus.ERROR || !jokeData.data) {
      throw new Error('Joke not found');
    }

    await firstValueFrom(
      this.submitServiceClient.send<ResponseDto<SubmittedJokeDto>>(
        MessagePatternTypes.SUBMIT_SVC_MARK_ACCEPTED,
        { id },
      ),
    );

    const createdJoke = await firstValueFrom(
      this.deliveryServiceClient.send<ResponseDto<JokeDto>, CreateJokeDto>(
        MessagePatternTypes.DELIVER_SVC_INSERT_JOKE,
        {
          joke: jokeData.data.joke,
          type: jokeData.data.joke_type_id,
        },
      ),
    );

    return createdJoke;
  }

  async reject(id: string) {
    const jokeData = await firstValueFrom(
      this.submitServiceClient.send<ResponseDto<SubmittedJokeDto>>(
        MessagePatternTypes.SUBMIT_SVC_GET_NEW_JOKE,
        { id },
      ),
    );

    if (jokeData.status === ResponseStatus.ERROR || !jokeData.data) {
      throw new Error('Joke not found');
    }

    await firstValueFrom(
      this.submitServiceClient.send<ResponseDto<SubmittedJokeDto>>(
        MessagePatternTypes.SUBMIT_SVC_DELETE,
        { id },
      ),
    );

    return true;
  }

  async fetchPendingJokes(page: number, limit: number) {
    return firstValueFrom(
      this.submitServiceClient.send<ResponseDto<SubmittedJokeDto[]>>(
        MessagePatternTypes.SUBMIT_SVC_GET_NEW_JOKES,
        { page, limit },
      ),
    );
  }
}
