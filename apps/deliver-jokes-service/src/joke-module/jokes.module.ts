import { Module } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';
import { JokeTypesController } from './joke-types.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Joke } from '../entities/Joke.entity';
import { JokeType } from '../entities/JokeType.entity';
import { TCPController } from './tcp.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Joke, JokeType],
    }),
  ],
  controllers: [JokesController, JokeTypesController, TCPController],
  providers: [JokesService],
})
export class JokesModule {}
