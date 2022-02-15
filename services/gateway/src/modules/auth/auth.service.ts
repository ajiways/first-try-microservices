import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { LOGIN_PATTERN, REGISTER_PATTERN } from '../../misc/constants';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { IAdministrationResponse } from './interfaces/administration.response.itnterface';

@Injectable()
export class AuthService implements OnModuleInit {
  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf(LOGIN_PATTERN);
    this.kafkaClient.subscribeToResponseOf(REGISTER_PATTERN);
    await this.kafkaClient.connect();
  }

  @Inject('administration')
  private readonly kafkaClient: ClientKafka;

  async login(dto: LoginDto): Promise<IAdministrationResponse> {
    return await lastValueFrom(this.kafkaClient.send(LOGIN_PATTERN, dto));
  }

  async register(dto: RegisterDto): Promise<IAdministrationResponse> {
    return await lastValueFrom(this.kafkaClient.send(REGISTER_PATTERN, dto));
  }
}
