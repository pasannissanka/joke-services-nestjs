import { Controller, Get, Param, Query } from '@nestjs/common';
import { JokeDto, ResponseDto } from '../../../../libs/types/src';
import { JokesService } from './jokes.service';

@Controller('v1/jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Get()
  async paginateJokes(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<ResponseDto<JokeDto[]>> {
    const data = await this.jokesService.paginateJokes(page, limit);

    return ResponseDto.success(data, 'Jokes fetched successfully');
  }

  @Get(':id')
  async getJokeById(@Param('id') id: string): Promise<ResponseDto<JokeDto>> {
    const data = await this.jokesService.getJokeById(id);

    return ResponseDto.success(data, 'Joke fetched successfully');
  }

  @Get('random')
  async getRandomJoke(): Promise<ResponseDto<JokeDto>> {
    const data = await this.jokesService.getRandomJoke();

    return ResponseDto.success(data, 'Random joke fetched successfully');
  }
}
