import { MongoDriver, Options } from '@mikro-orm/mongodb';
import { SubmittedJoke } from '../entities/submittedJoke.entity';

const config: Options = {
  driver: MongoDriver,
  dbName: process.env.MONGO_DB_NAME,
  clientUrl: process.env.MONGO_DB_URL,
  debug: true,
  entities: [SubmittedJoke],
};

export default config;
