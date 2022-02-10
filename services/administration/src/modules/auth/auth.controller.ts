import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { ILoginData } from './interfaces/login.data.interface';
import { IRegisterData } from './interfaces/register.data.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('gateway.login')
  async login(@Payload() data: ILoginData) {
    return this.authService.login(data);
  }

  @MessagePattern('gateway.register')
  async register(@Payload() data: IRegisterData) {
    return this.authService.register(data);
  }
}
