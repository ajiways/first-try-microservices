import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_HOST, KAFKA_PORT } from '../../misc/config';
import { GATEWAY_SERVICE } from '../../misc/constants';

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
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
