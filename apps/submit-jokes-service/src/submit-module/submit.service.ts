import { EnsureRequestContext, EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  JokeTypeDto,
  MessagePatternTypes,
  ResponseDto,
  ResponseStatus,
  Services,
  SubmitJokeDto,
  SubmittedJokeDto,
} from '../../../../libs/types/src';
import { SubmittedJoke } from '../entities/submittedJoke.entity';

@Injectable()
export class SubmitService {
  private readonly logger = new Logger(SubmitService.name);

  constructor(
    @InjectRepository(SubmittedJoke)
    private readonly submitJokeRepository: EntityRepository<SubmittedJoke>,
    @Inject(Services.DELIVER_JOKES_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  async create(payload: SubmitJokeDto) {
    this.logger.log(`[create] payload: [${JSON.stringify(payload)}]`);

    const jokeType = await firstValueFrom(
      this.client.send<ResponseDto<JokeTypeDto>>(
        MessagePatternTypes.DELIVER_SVC_FETCH_JOKE_TYPE_BY_ID,
        {
          id: payload.joke_type_id,
        },
      ),
    );

    this.logger.log(`[create] jokeType: [${JSON.stringify(jokeType)}]`);

    if (jokeType.status === ResponseStatus.ERROR || !jokeType.data) {
      this.logger.error(`[create] error: [${JSON.stringify(jokeType.error)}]`);
      throw new Error('Invalid joke type id');
    }

    const data = this.submitJokeRepository.create({
      joke: payload.joke,
      joke_type_id: BigInt(jokeType.data.id),
      isAccepted: false,
    });

    await this.submitJokeRepository.getEntityManager().persistAndFlush(data);
    return SubmittedJokeDto.fromEntity(data);
  }

  @EnsureRequestContext<SubmitService>((t) => t.submitJokeRepository)
  async paginateJokes(page = 1, limit = 10): Promise<SubmittedJokeDto[]> {
    const jokes = await this.submitJokeRepository.find(
      { isAccepted: false },
      { limit, offset: (page - 1) * limit },
    );

    const jokesWithJokeType = await Promise.all(
      jokes.map(async (joke) => {
        const jokeType = await firstValueFrom(
          this.client.send<ResponseDto<JokeTypeDto>>(
            MessagePatternTypes.DELIVER_SVC_FETCH_JOKE_TYPE_BY_ID,
            {
              id: joke.joke_type_id.toString(),
            },
          ),
        );

        return {
          ...joke,
          jokeType: jokeType.data,
        };
      }),
    );

    return jokesWithJokeType.map((joke) => SubmittedJokeDto.fromEntity(joke));
  }

  @EnsureRequestContext<SubmitService>((t) => t.submitJokeRepository)
  async getJokeById(id: string) {
    const data = await this.submitJokeRepository.findOneOrFail({
      id,
      isAccepted: false,
    });

    return SubmittedJokeDto.fromEntity(data);
  }

  @EnsureRequestContext<SubmitService>((t) => t.submitJokeRepository)
  async markAsAccepted(id: string) {
    await this.submitJokeRepository.nativeUpdate({ id }, { isAccepted: true });

    return true;
  }

  @EnsureRequestContext<SubmitService>((t) => t.submitJokeRepository)
  async delete(id: string) {
    const data = await this.submitJokeRepository.findOneOrFail({ id });

    data.isAccepted = true;

    await this.submitJokeRepository.getEntityManager().removeAndFlush(data);

    return true;
  }
}
