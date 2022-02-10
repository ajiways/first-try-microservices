import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { IAdministrationResponse } from './interfaces/administration.response.itnterface';

@Injectable()
export class AuthService implements OnModuleInit {
  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('gateway.login');
    this.kafkaClient.subscribeToResponseOf('gateway.register');
    await this.kafkaClient.connect();
  }
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'gateway',
      },
    },
  })
  private readonly kafkaClient: ClientKafka;

  async login(dto: LoginDto): Promise<IAdministrationResponse> {
    return await lastValueFrom(this.kafkaClient.send('gateway.login', dto));
  }

  async register(dto: RegisterDto): Promise<IAdministrationResponse> {
    return await lastValueFrom(this.kafkaClient.send('gateway.register', dto));
  }
}
