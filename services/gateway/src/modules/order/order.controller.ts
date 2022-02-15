import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '../../decorators/user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllOrders(@User('id') id: number) {
    return this.orderService.getAllOrders(id);
  }
}
