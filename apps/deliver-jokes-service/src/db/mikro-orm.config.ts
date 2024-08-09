import { MySqlDriver, Options } from '@mikro-orm/mysql';
import { Joke } from '../entities/Joke.entity';
import { JokeType } from '../entities/JokeType.entity';
import { SeedManager } from '@mikro-orm/seeder';

const config: Options = {
  driver: MySqlDriver,
  dbName: 'JOKES_DB',
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'app_user',
  password: process.env.DB_PASSWORD || 'password',
  charset: 'utf8mb4',
  debug: true,
  entities: [Joke, JokeType],
  extensions: [SeedManager],
  seeder: {
    path: './apps/deliver-jokes-service/src/db/seeders',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
};

export default config;
