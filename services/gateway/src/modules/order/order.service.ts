import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderService implements OnModuleInit {
  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('gateway.get-user-orders');
    this.kafkaClient.subscribeToResponseOf('gateway.check-token');
    await this.kafkaClient.connect();
  }
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'gateway-orders',
      },
    },
  })
  private readonly kafkaClient: ClientKafka;

  async getAllOrders(id: number) {
    return await lastValueFrom(
      this.kafkaClient.send('gateway.get-user-orders', id),
    );
  }

  async checkToken(token: string) {
    return await lastValueFrom(
      this.kafkaClient.send('gateway.check-token', token),
    );
  }
}
