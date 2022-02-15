import { Controller, UsePipes } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { GET_ORDRES_PATTERN } from "../../misc/constants";
import { ValidationPipe } from "../../pipes/validation.pipe";
import { IdDto } from "./dtos/id.dto";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";

@Controller("orders")
export class OrderController {
   constructor(private readonly orderService: OrderService) {}

   @MessagePattern(GET_ORDRES_PATTERN)
   @UsePipes(ValidationPipe)
   async getOrderByUserId(@Payload() data: IdDto): Promise<Order[]> {
      return this.orderService.fineByUserId(data.id);
   }
}
