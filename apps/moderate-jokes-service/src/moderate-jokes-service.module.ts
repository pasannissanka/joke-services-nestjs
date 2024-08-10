import { Module } from '@nestjs/common';
import { ModerateJokesServiceController } from './moderate-jokes-service.controller';
import { ModerateJokesServiceService } from './moderate-jokes-service.service';
import { ConfigModule } from '@nestjs/config';
import { ModerationModule } from './moderation-module/moderation.module';
import { AuthModule } from './auth-module/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ModerationModule,
    AuthModule,
  ],
  controllers: [ModerateJokesServiceController],
  providers: [ModerateJokesServiceService],
})
export class ModerateJokesServiceModule {}
