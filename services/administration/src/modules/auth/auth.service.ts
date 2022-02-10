import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ILoginData } from './interfaces/login.data.interface';
import { TokenService } from '../token/token.service';
import { compare, hash } from 'bcrypt';
import { IRegisterData } from './interfaces/register.data.interface';
import { IServiceReponse } from './interfaces/service.response.interface';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'adminstration-service',
      },
    },
  })
  private readonly kafkaClient: ClientKafka;

  constructor(
    @InjectRepository(User) private readonly authRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginData: ILoginData): Promise<IServiceReponse> {
    const candidate = await this.authRepository.findOne({
      where: { login: loginData.value.login },
    });

    if (!candidate) {
      return {
        message: 'Wrong login or password',
        status: HttpStatus.BAD_REQUEST,
      };
    } else {
      const match = await compare(loginData.value.password, candidate.password);

      if (match) {
        return {
          message: 'Successfully logged in',
          token: this.tokenService.generateToken(candidate),
          status: HttpStatus.OK,
        };
      } else {
        return {
          message: 'Wrong password',
          status: HttpStatus.BAD_REQUEST,
        };
      }
    }
  }

  async register(registerData: IRegisterData): Promise<IServiceReponse> {
    const candidateLogin = await this.authRepository.findOne({
      where: { login: registerData.value.login },
    });
    const candidatePhone = await this.authRepository.findOne({
      where: {
        phone: registerData.value.phone,
      },
    });

    if (candidateLogin || candidatePhone) {
      return {
        message: 'User with the provided login or phone already exists',
        status: HttpStatus.BAD_REQUEST,
      };
    } else {
      registerData.value.password = await hash(registerData.value.password, 7);
      const user = await this.authRepository.create(registerData.value).save();

      this.kafkaClient.emit('administration.register', user);

      return {
        message: 'Successfully registered!',
        token: this.tokenService.generateToken(user),
        status: HttpStatus.CREATED,
      };
    }
  }
}
