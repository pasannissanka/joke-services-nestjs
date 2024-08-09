import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { JokeType } from './JokeType.entity';

@Entity()
export class Joke {
  @PrimaryKey({ autoincrement: true })
  id!: bigint;

  @Property()
  joke!: string;

  @ManyToOne(() => JokeType)
  type!: JokeType;

  @Property()
  createdAt = new Date();

  constructor(partial: Partial<Joke>) {
    Object.assign(this, partial);
  }
}
