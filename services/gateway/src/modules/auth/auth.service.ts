import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { IAdministrationResponse } from './interfaces/administration.response.itnterface';

@Injectable()
export class AuthService implements OnModuleInit {
  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('administration.login');
    this.kafkaClient.subscribeToResponseOf('administration.register');
    await this.kafkaClient.connect();
  }

  @Inject('administration')
  private readonly kafkaClient: ClientKafka;

  async login(dto: LoginDto): Promise<IAdministrationResponse> {
    return await lastValueFrom(
      this.kafkaClient.send('administration.login', dto),
    );
  }

  async register(dto: RegisterDto): Promise<IAdministrationResponse> {
    return await lastValueFrom(
      this.kafkaClient.send('administration.register', dto),
    );
  }
}
