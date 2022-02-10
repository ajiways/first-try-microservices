import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { OrderService } from '../modules/order/order.service';
import { ResponseInterface } from './interfaces/response.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly orderService: OrderService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new HttpException('User is unauthorized', HttpStatus.FORBIDDEN);
    }

    const token: string = request.headers.authorization.split(' ')[1];

    if (!token) {
      throw new HttpException('User is unauthorized', HttpStatus.FORBIDDEN);
    }

    const res: ResponseInterface = await this.orderService.checkToken(token);

    if (!res) {
      throw new HttpException('User is unauthorized', HttpStatus.FORBIDDEN);
    }

    request.user = res;
    return true;
  }
}
