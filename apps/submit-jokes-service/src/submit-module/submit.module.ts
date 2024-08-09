import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SubmittedJoke } from '../entities/submittedJoke.entity';
import { SubmitController } from './submit.controller';
import { SubmitService } from './submit.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [SubmittedJoke],
    }),
  ],
  controllers: [SubmitController],
  providers: [SubmitService],
})
export class SubmitModule {}
