import { Controller, Get, Param, Query } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { JokeDto, JokeTypeDto, ResponseDto } from '../../../../libs/types/src';

@Controller('v1/joke-types')
export class JokeTypesController {
  constructor(private readonly jokesService: JokesService) {}

  @Get()
  async paginateTypes(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<ResponseDto<JokeDto[]>> {
    const data = await this.jokesService.paginate(page, limit);

    return ResponseDto.success(data);
  }

  @Get(':id')
  async getJokeTypeById(
    @Param('id') id: string,
  ): Promise<ResponseDto<JokeTypeDto>> {
    const data = await this.jokesService.getJokeTypeById(id);

    return ResponseDto.success(data);
  }

  @Get(':id/jokes')
  async paginateJokesByType(
    @Param('id') id: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<ResponseDto<JokeDto[]>> {
    const data = await this.jokesService.getJokesByType(id, page, limit);

    return ResponseDto.success(data);
  }
}
