import { Injectable, Logger } from '@nestjs/common';
import { SubmittedJoke } from '../entities/submittedJoke.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  JokeTypeDto,
  ResponseDto,
  ResponseStatus,
  SubmitJokeDto,
  SubmittedJokeDto,
} from '../../../../libs/types/src';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SubmitService {
  private client: ClientProxy;

  private readonly logger = new Logger(SubmitService.name);

  constructor(
    @InjectRepository(SubmittedJoke)
    private readonly submitJokeRepository: EntityRepository<SubmittedJoke>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8221,
      },
    });
  }

  async create(payload: SubmitJokeDto) {
    this.logger.log(`[create] payload: [${JSON.stringify(payload)}]`);

    const jokeType = await firstValueFrom(
      this.client.send<ResponseDto<JokeTypeDto>>('fetchJokeTypeById', {
        id: payload.joke_type_id,
      }),
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
}
