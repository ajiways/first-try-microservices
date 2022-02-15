import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { GET_ORDERS_PATTERN } from '../../misc/constants';

@Injectable()
export class OrderService {
  constructor(
    @Inject('administration')
    private readonly kafkaClient: ClientKafka,
  ) {
    this.kafkaClient.subscribeToResponseOf(GET_ORDERS_PATTERN);
  }

  async getAllOrders(id: number) {
    return await lastValueFrom(
      this.kafkaClient.send(GET_ORDERS_PATTERN, { id: id }),
    );
  }
}
