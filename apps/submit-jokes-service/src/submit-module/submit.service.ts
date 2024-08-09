import { Injectable } from '@nestjs/common';
import { SubmittedJoke } from '../entities/submittedJoke.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { SubmitJokeDto, SubmittedJokeDto } from '../../../../libs/types/src';

@Injectable()
export class SubmitService {
  constructor(
    @InjectRepository(SubmittedJoke)
    private readonly submitJokeRepository: EntityRepository<SubmittedJoke>,
  ) {}

  async create(payload: SubmitJokeDto): Promise<SubmittedJokeDto> {
    // TODO validate joke_type_id

    const data = this.submitJokeRepository.create({
      joke: payload.joke,
      joke_type_id: BigInt(payload.joke_type_id),
    });

    await this.submitJokeRepository.getEntityManager().persistAndFlush(data);

    return SubmittedJokeDto.fromEntity(data);
  }
}
