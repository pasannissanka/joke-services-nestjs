import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Joke } from './Joke.entity';

@Entity()
export class JokeType {
  @PrimaryKey({ autoincrement: true })
  id!: bigint;

  @Property()
  type!: string;

  @OneToMany(() => Joke, (joke) => joke.type)
  jokes = new Collection<Joke>(this);

  @Property()
  createdAt = new Date();
}
