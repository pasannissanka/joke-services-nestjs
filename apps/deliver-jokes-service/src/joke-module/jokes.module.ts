import { Module } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';
import { JokeTypesController } from './joke-types.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Joke } from '../entities/Joke.entity';
import { JokeType } from '../entities/JokeType.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Joke, JokeType],
    }),
  ],
  controllers: [JokesController, JokeTypesController],
  providers: [JokesService],
})
export class JokesModule {}
