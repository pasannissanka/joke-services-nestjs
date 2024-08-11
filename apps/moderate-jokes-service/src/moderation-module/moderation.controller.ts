import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { ResponseDto, SubmittedJokeDto } from '../../../../libs/types/src';
import { JwtAuthGuard } from '../auth-module/guards/jwt-auth.guard';

@Controller('v1/moderation/pending-jokes')
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async paginateJokes(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<ResponseDto<SubmittedJokeDto[]>> {
    return this.moderationService.fetchPendingJokes(
      parseInt(page),
      parseInt(limit),
    );
  }

  @Post(':id/accept')
  @UseGuards(JwtAuthGuard)
  async acceptJoke(@Param('id') id: string) {
    return this.moderationService.accept(id);
  }

  @Post(':id/reject')
  @UseGuards(JwtAuthGuard)
  async rejectJoke(@Param('id') id: string) {
    return this.moderationService.reject(id);
  }
}
