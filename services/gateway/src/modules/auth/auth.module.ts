import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_HOST, KAFKA_PORT } from '../../misc/config';
import { GATEWAY_SERVICE } from '../../misc/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'administration',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
          },
          consumer: {
            groupId: GATEWAY_SERVICE,
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
