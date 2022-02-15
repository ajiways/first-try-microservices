import { HttpStatus, Injectable } from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { compare, hash } from 'bcrypt';
import { IServiceReponse } from './interfaces/service.response.interface';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { ADMINISTRATION_SERVICE } from '../../misc/constants';
import { KAFKA_HOST, KAFKA_PORT } from '../../misc/service';

@Injectable()
export class AuthService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
      },
      consumer: {
        groupId: ADMINISTRATION_SERVICE,
      },
    },
  })
  private readonly kafkaClient: ClientKafka;

  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginData: LoginDto): Promise<IServiceReponse> {
    const candidate = await this.userService.findOneWithParams({
      where: { login: loginData.login },
    });

    if (!candidate) {
      return {
        message: 'Wrong login or password',
        status: HttpStatus.BAD_REQUEST,
      };
    } else {
      const match = await compare(loginData.password, candidate.password);

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

  async register(registerData: RegisterDto): Promise<IServiceReponse> {
    const candidateLogin = await this.userService.findOneWithParams({
      where: { login: registerData.login },
    });
    const candidatePhone = await this.userService.findOneWithParams({
      where: {
        phone: registerData.phone,
      },
    });

    if (candidateLogin || candidatePhone) {
      return {
        message: 'User with the provided login or phone already exists',
        status: HttpStatus.BAD_REQUEST,
      };
    } else {
      registerData.password = await hash(registerData.password, 7);
      const user = await this.userService.createUser(registerData);

      this.kafkaClient.emit('administration.register', user);

      return {
        message: 'Successfully registered!',
        token: this.tokenService.generateToken(user),
        status: HttpStatus.CREATED,
      };
    }
  }
}
