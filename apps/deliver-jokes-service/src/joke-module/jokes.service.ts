import { EnsureRequestContext, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { CreateJokeDto, JokeDto, JokeTypeDto } from 'libs/types/src';
import { Joke } from '../entities/Joke.entity';
import { JokeType } from '../entities/JokeType.entity';

@Injectable()
export class JokesService {
  private readonly logger = new Logger(JokesService.name);

  constructor(
    @InjectRepository(Joke)
    private readonly jokeRepository: EntityRepository<Joke>,
    @InjectRepository(JokeType)
    private readonly jokeTypeRepository: EntityRepository<JokeType>,
  ) {}

  async paginateJokes(page = 1, limit = 10): Promise<JokeDto[]> {
    const jokes = await this.jokeRepository.find(
      {},
      { limit, offset: (page - 1) * limit, populate: ['type'] },
    );

    return jokes.map((joke) => JokeDto.fromEntity(joke));
  }

  @EnsureRequestContext<JokesService>((t) => t.jokeTypeRepository)
  async paginateJokeTypes(page = 1, limit = 10): Promise<JokeTypeDto[]> {
    const jokeTypes = await this.jokeTypeRepository.find(
      {},
      { limit, offset: (page - 1) * limit, populate: ['type'] },
    );

    return jokeTypes.map((joke) => JokeTypeDto.fromEntity(joke));
  }

  async getJokeById(id: string): Promise<JokeDto> {
    if (Number.isNaN(parseInt(id))) {
      throw new Error('Invalid joke id');
    }

    const joke = await this.jokeRepository.findOneOrFail(
      { id: parseInt(id, 10) },
      { populate: ['type'] },
    );

    return JokeDto.fromEntity(joke);
  }

  async getRandomJoke(): Promise<JokeDto> {
    const joke = await this.jokeRepository.findOneOrFail(
      {},
      { orderBy: { id: 'ASC' }, populate: ['type'] },
    );

    return JokeDto.fromEntity(joke);
  }

  async createJoke(joke: CreateJokeDto): Promise<Joke> {
    const jokeType = await this.jokeTypeRepository.findOneOrFail({
      id: joke.type,
    });

    const newJoke = this.jokeRepository.create({
      joke: joke.joke,
      type: jokeType,
    });

    await this.jokeRepository.getEntityManager().persistAndFlush(newJoke);

    return newJoke;
  }

  async createJokeType(type: string): Promise<JokeType> {
    const newType = this.jokeTypeRepository.create({ type });

    await this.jokeTypeRepository.getEntityManager().persistAndFlush(newType);

    return newType;
  }

  @EnsureRequestContext<JokesService>((t) => t.jokeTypeRepository)
  async getJokeTypeById(id: string): Promise<JokeTypeDto> {
    if (Number.isNaN(parseInt(id))) {
      throw new Error('Invalid joke type id');
    }

    const data = await this.jokeTypeRepository.findOneOrFail({
      id: parseInt(id, 10),
    });

    return JokeTypeDto.fromEntity(data);
  }

  async getJokesByType(
    id: string,
    limit: number = 10,
    page: number = 1,
  ): Promise<JokeDto[]> {
    if (Number.isNaN(parseInt(id))) {
      throw new Error('Invalid joke type id');
    }

    const jokeType = await this.jokeTypeRepository.findOneOrFail({
      id: parseInt(id, 10),
    });

    const jokes = await this.jokeRepository.find(
      { type: jokeType.id },
      { limit, offset: (page - 1) * limit, populate: ['type'] },
    );

    return jokes.map((joke) => JokeDto.fromEntity(joke));
  }
}
