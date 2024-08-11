import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { ResponseDto, SubmittedJokeDto } from '../../../../libs/types/src';

@Controller('v1/moderation/pending-jokes')
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Get()
  async paginateJokes(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<ResponseDto<SubmittedJokeDto[]>> {
    return this.moderationService.fetchPendingJokes(page, limit);
  }

  @Post(':id/accept')
  async acceptJoke(@Param('id') id: string) {
    return this.moderationService.accept(id);
  }

  @Post(':id/reject')
  async rejectJoke(@Param('id') id: string) {
    return this.moderationService.reject(id);
  }
}
