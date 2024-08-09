import { Options, MongoDriver } from '@mikro-orm/mongodb';
import { SeedManager } from '@mikro-orm/seeder';
import { SubmittedJoke } from '../entities/submittedJoke.entity';

const config: Options = {
  driver: MongoDriver,
  dbName: 'JOKES_SUBMIT_DB',
  clientUrl: process.env.DB_MONGO_URL || 'mongodb://localhost:27017',
  debug: true,
  entities: [SubmittedJoke],
  extensions: [SeedManager],
  // seeder: {
  //   path: './apps/submit-jokes-service/src/db/seeders',
  //   defaultSeeder: 'DatabaseSeeder',
  //   glob: '!(*.d).{js,ts}',
  //   emit: 'ts',
  //   fileName: (className: string) => className,
  // },
};

export default config;
