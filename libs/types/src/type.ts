import { ApiProperty } from '@nestjs/swagger';
import { Joke } from '../../../apps/deliver-jokes-service/src/entities/Joke.entity';
import { JokeType } from '../../../apps/deliver-jokes-service/src/entities/JokeType.entity';
import { SubmittedJoke } from '../../../apps/submit-jokes-service/src/entities/submittedJoke.entity';

export enum ResponseStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export class ResponseDto<T> {
  @ApiProperty()
  message: string;

  @ApiProperty()
  status: ResponseStatus;

  @ApiProperty()
  data: T;

  @ApiProperty()
  error?: any;

  static success<T>(data: T, message = 'Success'): ResponseDto<T> {
    return {
      message,
      status: ResponseStatus.SUCCESS,
      data,
    };
  }

  static error<T>(error: any, message = 'Error'): ResponseDto<T> {
    return {
      message,
      status: ResponseStatus.ERROR,
      data: null,
      error,
    };
  }
}

export class JokeTypeDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  jokes: JokeDto[];

  @ApiProperty()
  createdAt: Date;

  static fromEntity(jokeType: JokeType): JokeTypeDto {
    const dto = new JokeTypeDto();
    dto.id = jokeType.id.toString();
    dto.type = jokeType?.type;

    if (jokeType?.jokes?.isInitialized()) {
      dto.jokes = jokeType.jokes
        .getItems()
        .map((joke) => JokeDto.fromEntity(joke));
    }

    dto.createdAt = jokeType?.createdAt;
    return dto;
  }
}

export class JokeDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  joke: string;

  @ApiProperty()
  type: JokeTypeDto;

  @ApiProperty()
  createdAt: Date;

  static fromEntity(joke: Joke): JokeDto {
    const dto = new JokeDto();
    dto.id = joke?.id?.toString();
    dto.joke = joke?.joke;
    dto.type = JokeTypeDto?.fromEntity(joke.type);
    dto.createdAt = joke?.createdAt;
    return dto;
  }
}

export class SubmittedJokeDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  joke: string;

  @ApiProperty()
  joke_type_id: string;

  @ApiProperty()
  jokeType?: JokeTypeDto;

  static fromEntity(data: SubmittedJoke & { jokeType?: JokeTypeDto }) {
    const dto = new SubmittedJokeDto();

    dto.id = data.id
      ? data.id
      : data._id.toString()
        ? data._id.toString()
        : null;
    dto.joke = data.joke;
    dto.joke_type_id = data.joke_type_id?.toString();
    dto.jokeType = data?.jokeType;

    return dto;
  }
}

export class AuthUserDto {
  email: string;

  constructor(partial: Partial<AuthUserDto>) {
    Object.assign(this, partial);
  }
}
