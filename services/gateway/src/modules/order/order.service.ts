import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @Inject('administration')
    private readonly kafkaClient: ClientKafka,
  ) {
    this.kafkaClient.subscribeToResponseOf('market.get-user-orders');
  }

  async getAllOrders(id: number) {
    return await lastValueFrom(
      this.kafkaClient.send('market.get-user-orders', { id: id }),
    );
  }
}
