import { Controller, Param, Post } from '@nestjs/common';
import { ModerationService } from './moderation.service';

@Controller('v1/moderation')
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Post(':id/accept-joke')
  async acceptJoke(@Param('id') id: string) {
    return this.moderationService.accept(id);
  }

  @Post(':id/reject-joke')
  async rejectJoke(@Param('id') id: string) {
    return this.moderationService.reject(id);
  }
}
