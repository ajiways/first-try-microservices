import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllOrders(@Req() request) {
    return this.orderService.getAllOrders(request.user.id);
  }
}
