import { Module } from '@nestjs/common';
import { SubmitJokesServiceController } from './submit-jokes-service.controller';
import { SubmitJokesServiceService } from './submit-jokes-service.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import config from './db/mikro-orm.config';
import { SubmitModule } from './submit-module/submit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      useFactory: () => ({
        ...config,
      }),
    }),
    SubmitModule,
  ],
  controllers: [SubmitJokesServiceController],
  providers: [SubmitJokesServiceService],
})
export class SubmitJokesServiceModule {}
