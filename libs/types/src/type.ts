import { ApiProperty } from '@nestjs/swagger';
import { Joke } from '../../../apps/deliver-jokes-service/src/entities/Joke.entity';
import { JokeType } from '../../../apps/deliver-jokes-service/src/entities/JokeType.entity';

export class ResponseDto<T> {
  @ApiProperty()
  message: string;

  @ApiProperty()
  status: 'SUCCESS' | 'ERROR';

  @ApiProperty()
  data: T;

  @ApiProperty()
  error?: any;

  static success<T>(data: T, message = 'Success'): ResponseDto<T> {
    return {
      message,
      status: 'SUCCESS',
      data,
    };
  }

  static error<T>(error: any, message = 'Error'): ResponseDto<T> {
    return {
      message,
      status: 'ERROR',
      data: null,
      error,
    };
  }
}

export class JokeTypeDto {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  type: string;

  @ApiProperty()
  jokes: JokeDto[];

  @ApiProperty()
  createdAt: Date;

  static fromEntity(jokeType: JokeType): JokeTypeDto {
    const dto = new JokeTypeDto();
    dto.id = jokeType.id;
    dto.type = jokeType.type;
    dto.jokes = jokeType.jokes
      .getItems()
      .map((joke) => JokeDto.fromEntity(joke));
    dto.createdAt = jokeType.createdAt;
    return dto;
  }
}

export class JokeDto {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  joke: string;

  @ApiProperty()
  type: JokeTypeDto;

  @ApiProperty()
  createdAt: Date;

  static fromEntity(joke: Joke): JokeDto {
    const dto = new JokeDto();
    dto.id = joke.id;
    dto.joke = joke.joke;
    dto.type = JokeTypeDto.fromEntity(joke.type);
    dto.createdAt = joke.createdAt;
    return dto;
  }
}
