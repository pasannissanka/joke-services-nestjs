import { Module } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { ModerationController } from './moderation.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Services } from '../../../../libs/types/src';

@Module({
  imports: [
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
        {
          useFactory: (configService: ConfigService) => {
            return {
              transport: Transport.TCP,
              options: {
                host: configService.get('SUBMIT_SVC_HOST'),
                port: parseInt(configService.get('SUBMIT_SVC_TCP_PORT')),
              },
            };
          },
          name: Services.SUBMIT_JOKES_SERVICE,
          inject: [ConfigService],
        },
      ],
      isGlobal: true,
    }),
  ],
  controllers: [ModerationController],
  providers: [ModerationService],
})
export class ModerationModule {}
