import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { JokeDto, JokeTypeDto, ResponseDto } from '../../../../libs/types/src';
import { MessagePattern } from '@nestjs/microservices';

@Controller('v1/joke-types')
export class JokeTypesController {
  private readonly logger = new Logger(JokeTypesController.name);

  constructor(private readonly jokesService: JokesService) {}

  @Get()
  async paginateTypes(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<ResponseDto<JokeTypeDto[]>> {
    const data = await this.jokesService.paginateJokeTypes(page, limit);

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

  @MessagePattern('fetchJokeTypes')
  async fetchJokeTypes(payload: { limit: number; page: number }) {
    this.logger.log(`[fetchJokeTypes] payload: [${JSON.stringify(payload)}]`);
    const data = await this.jokesService.paginateJokeTypes(
      payload.page,
      payload.limit,
    );

    return ResponseDto.success(data);
  }

  @MessagePattern('fetchJokeTypeById')
  async fetchJokeTypeById(payload: { id: string }) {
    this.logger.log(
      `[fetchJokeTypeById] payload: [${JSON.stringify(payload)}]`,
    );
    const data = await this.jokesService.getJokeTypeById(payload.id);

    return ResponseDto.success(data);
  }
}
