import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity()
export class SubmittedJoke {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  joke!: string;

  @Property()
  joke_type_id!: bigint;

  @Property()
  createdAt = new Date();

  @Property()
  isAccepted: boolean;

  constructor(partial: Partial<SubmittedJoke>) {
    Object.assign(this, partial);
  }
}
