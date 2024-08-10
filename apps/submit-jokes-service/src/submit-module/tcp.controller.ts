import { Controller, Logger } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { MessagePattern } from '@nestjs/microservices';
import { MessagePatternTypes, ResponseDto } from '../../../../libs/types/src';

@Controller()
export class TCPController {
  private readonly logger = new Logger(TCPController.name);

  constructor(private readonly submitService: SubmitService) {}

  @MessagePattern(MessagePatternTypes.SUBMIT_SVC_GET_NEW_JOKES)
  async paginateNewJokes(payload: { limit: number; page: number }) {
    this.logger.log(
      `[${MessagePatternTypes.SUBMIT_SVC_GET_NEW_JOKES}] payload: [${JSON.stringify(payload)}]`,
    );

    const data = await this.submitService.paginateJokes(
      payload.page,
      payload.limit,
    );

    return ResponseDto.success(data);
  }

  @MessagePattern(MessagePatternTypes.SUBMIT_SVC_GET_NEW_JOKE)
  async getJokeById(payload: { id: string }) {
    this.logger.log(
      `[${MessagePatternTypes.SUBMIT_SVC_GET_NEW_JOKE}] payload: [${JSON.stringify(payload)}]`,
    );

    const data = await this.submitService.getJokeById(payload.id);

    return ResponseDto.success(data);
  }

  @MessagePattern(MessagePatternTypes.SUBMIT_SVC_MARK_ACCEPTED)
  async markAsAccepted(payload: { id: string }) {
    this.logger.log(
      `[${MessagePatternTypes.SUBMIT_SVC_MARK_ACCEPTED}] payload: [${JSON.stringify(payload)}]`,
    );

    const data = await this.submitService.markAsAccepted(payload.id);

    return ResponseDto.success(data);
  }

  @MessagePattern(MessagePatternTypes.SUBMIT_SVC_DELETE)
  async deleteJoke(payload: { id: string }) {
    this.logger.log(
      `[${MessagePatternTypes.SUBMIT_SVC_DELETE}] payload: [${JSON.stringify(payload)}]`,
    );

    const data = await this.submitService.delete(payload.id);

    return ResponseDto.success(data);
  }
}
