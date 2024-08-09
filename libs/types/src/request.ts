import { ApiProperty } from '@nestjs/swagger';

export class CreateJokeDto {
  @ApiProperty()
  joke: string;

  @ApiProperty()
  type: bigint;
}

export class CreateJokeTypeDto {
  @ApiProperty()
  type: string;
}
