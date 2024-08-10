import { Module } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { ModerationController } from './moderation.controller';

@Module({
  controllers: [ModerationController],
  providers: [ModerationService],
})
export class ModerationModule {}
