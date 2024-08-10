import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './db/mikro-orm.config';
import { DeliverJokesServiceController } from './deliver-jokes-service.controller';
import { JokesModule } from './joke-module/jokes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...config,
        dbName: configService.get('MYSQL_DB_NAME'),
        host: configService.get('MYSQL_DB_HOST'),
        user: configService.get('MYSQL_DB_USER'),
        password: configService.get('MYSQL_DB_PASSWORD'),
      }),
      inject: [ConfigService],
    }),
    JokesModule,
  ],
  controllers: [DeliverJokesServiceController],
  providers: [],
})
export class DeliverJokesServiceModule {}
