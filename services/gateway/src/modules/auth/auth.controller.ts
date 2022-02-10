import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { IAdministrationResponse } from './interfaces/administration.response.itnterface';
import { Response } from 'express';
import { RegisterDto } from './dtos/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IAdministrationResponse> {
    const result = await this.authService.login(dto);

    response.status(result.status);

    return result;
  }

  @Post('registration')
  @UsePipes(ValidationPipe)
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IAdministrationResponse> {
    const result = await this.authService.register(dto);

    response.status(result.status);

    return result;
  }
}
