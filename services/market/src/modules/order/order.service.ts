import { Injectable } from "@nestjs/common";
import { Order } from "./order.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class OrderService {
   constructor(
      @InjectRepository(Order)
      private readonly orderRepository: Repository<Order>
   ) {}

   async fineByUserId(id: number): Promise<Order[]> {
      return await this.orderRepository.find({ where: { customerId: id } });
   }
}
