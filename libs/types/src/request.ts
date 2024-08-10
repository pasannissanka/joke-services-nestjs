import { ApiProperty } from '@nestjs/swagger';

export class CreateJokeDto {
  @ApiProperty()
  joke: string;

  @ApiProperty()
  type: string;
}

export class CreateJokeTypeDto {
  @ApiProperty()
  type: string;
}

export class SubmitJokeDto {
  @ApiProperty()
  joke: string;

  @ApiProperty()
  joke_type_id: string;
}
