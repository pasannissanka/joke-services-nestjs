import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './db/mikro-orm.config';
import { DeliverJokesServiceController } from './deliver-jokes-service.controller';
import { JokesModule } from './joke-module/jokes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      useFactory: () => ({
        ...config,
      }),
    }),
    JokesModule,
  ],
  controllers: [DeliverJokesServiceController],
  providers: [],
})
export class DeliverJokesServiceModule {}
