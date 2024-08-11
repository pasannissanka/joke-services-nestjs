import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { JokeDto, JokeTypeDto, ResponseDto } from '../../../../libs/types/src';
import { JokesService } from './jokes.service';

@Controller('v1/joke-types')
export class JokeTypesController {
  private readonly logger = new Logger(JokeTypesController.name);

  constructor(private readonly jokesService: JokesService) {}

  @Get()
  async getAllTypes(): Promise<ResponseDto<JokeTypeDto[]>> {
    const data = await this.jokesService.getAllJokeTypes();

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
