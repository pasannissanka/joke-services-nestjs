import { Body, Controller, Post } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { ResponseDto, SubmitJokeDto } from '../../../../libs/types/src';
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
}
