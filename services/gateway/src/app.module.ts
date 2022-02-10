import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [AuthModule, OrderModule],
})
export class AppModule {}
