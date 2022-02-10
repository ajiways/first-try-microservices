import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { IData } from "./interfaces/data.interface";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";

@Controller("orders")
export class OrderController {
   constructor(private readonly orderService: OrderService) {}

   @MessagePattern("gateway.get-user-orders")
   async getOrderByUserId(@Payload() data: IData): Promise<Order[]> {
      return this.orderService.fineByUserId(data.value);
   }
}
