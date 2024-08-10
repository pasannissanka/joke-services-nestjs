import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SubmitService } from './submit.service';
import {
  ResponseDto,
  SubmitJokeDto,
  SubmittedJokeDto,
} from '../../../../libs/types/src';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Submit')
@Controller('v1/jokes')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Post()
  async create(@Body() body: SubmitJokeDto) {
    const data = await this.submitService.create(body);
    return ResponseDto.success(data, 'Joke submitted successfully');
  }

  @Get()
  async paginateJokes(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<ResponseDto<SubmittedJokeDto[]>> {
    const data = await this.submitService.paginateJokes(page, limit);
    return ResponseDto.success(data, 'Jokes fetched successfully');
  }
}
