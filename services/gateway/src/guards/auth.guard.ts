import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException,
  Inject,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CHECK_TOKEN_PATTERN } from '../misc/constants';
import { ResponseInterface } from './interfaces/response.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('administration')
    private readonly kafkaClient: ClientKafka,
  ) {
    this.kafkaClient.subscribeToResponseOf(CHECK_TOKEN_PATTERN);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new HttpException('User is unauthorized', HttpStatus.FORBIDDEN);
    }

    const token: string = request.headers.authorization.split(' ')[1];

    if (!token) {
      throw new HttpException('User is unauthorized', HttpStatus.FORBIDDEN);
    }

    const res: ResponseInterface = await lastValueFrom(
      this.kafkaClient.send(CHECK_TOKEN_PATTERN, { token: token }),
    );

    if (!res) {
      throw new HttpException('User is unauthorized', HttpStatus.FORBIDDEN);
    }

    request.user = res;
    return true;
  }
}
