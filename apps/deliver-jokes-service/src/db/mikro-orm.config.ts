import { MySqlDriver, Options } from '@mikro-orm/mysql';
import { Joke } from '../entities/Joke.entity';
import { JokeType } from '../entities/JokeType.entity';

const config: Options = {
  dbName: 'JOKES_DB',
  driver: MySqlDriver,
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'app_user',
  password: process.env.DB_PASSWORD || 'password',
  charset: 'utf8mb4',
  debug: true,
  entities: [Joke, JokeType],
};

export default config;
