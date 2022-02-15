import { Controller, HttpStatus, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LOGIN_PATTERN, REGISTER_PATTERN } from '../../misc/constants';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(LOGIN_PATTERN)
  @UsePipes(ValidationPipe)
  async login(@Payload() data: LoginDto) {
    if (!data.login) {
      return {
        message: data,
        status: HttpStatus.BAD_REQUEST,
      };
    }

    return this.authService.login(data);
  }

  @MessagePattern(REGISTER_PATTERN)
  async register(@Payload() data: RegisterDto) {
    if (!data.login) {
      return {
        message: data,
        status: HttpStatus.BAD_REQUEST,
      };
    }

    return this.authService.register(data);
  }
}
