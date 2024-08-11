import { Controller, Logger } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateJokeDto,
  MessagePatternTypes,
  ResponseDto,
} from '../../../../libs/types/src';

@Controller()
export class TCPController {
  private readonly logger = new Logger(TCPController.name);

  constructor(private readonly jokesService: JokesService) {}

  @MessagePattern(MessagePatternTypes.DELIVER_SVC_INSERT_JOKE)
  async createJoke(payload: CreateJokeDto) {
    this.logger.log(
      `[${MessagePatternTypes.DELIVER_SVC_INSERT_JOKE}] payload: [${JSON.stringify(payload)}]`,
    );
    const data = await this.jokesService.createJoke(payload);

    return ResponseDto.success(data);
  }

  @MessagePattern(MessagePatternTypes.DELIVER_SVC_FETCH_JOKE_TYPES)
  async fetchJokeTypes() {
    this.logger.log(`[${MessagePatternTypes.DELIVER_SVC_FETCH_JOKE_TYPES}]`);
    const data = await this.jokesService.getAllJokeTypes();

    return ResponseDto.success(data);
  }

  @MessagePattern(MessagePatternTypes.DELIVER_SVC_FETCH_JOKE_TYPE_BY_ID)
  async fetchJokeTypeById(payload: { id: string }) {
    this.logger.log(
      `[fetchJokeTypeById] payload: [${JSON.stringify(payload)}]`,
    );
    const data = await this.jokesService.getJokeTypeById(payload.id);

    return ResponseDto.success(data);
  }
}
