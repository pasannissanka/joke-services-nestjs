import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SubmittedJoke } from '../entities/submittedJoke.entity';
import { SubmitController } from './submit.controller';
import { SubmitService } from './submit.service';
import { TCPController } from './tcp.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Services } from '../../../../libs/types/src';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [SubmittedJoke],
    }),
    ClientsModule.registerAsync({
      clients: [
        {
          useFactory: (configService: ConfigService) => {
            return {
              transport: Transport.TCP,
              options: {
                host: configService.get('DELIVER_SVC_HOST'),
                port: parseInt(configService.get('DELIVER_SVC_TCP_PORT')),
              },
            };
          },
          name: Services.DELIVER_JOKES_SERVICE,
          inject: [ConfigService],
        },
      ],
      isGlobal: true,
    }),
  ],
  controllers: [SubmitController, TCPController],
  providers: [SubmitService],
})
export class SubmitModule {}
