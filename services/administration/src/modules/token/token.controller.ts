import { Controller, HttpStatus, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CHECK_TOKEN_PATTERN } from '../../misc/constants';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { TokenDto } from './dtos/token.dto';
import { TokenService } from './token.service';

@Controller()
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern(CHECK_TOKEN_PATTERN)
  @UsePipes(ValidationPipe)
  async checkToken(@Payload() data: TokenDto) {
    if (!data.token) {
      return {
        message: data,
        status: HttpStatus.BAD_REQUEST,
      };
    }

    return this.tokenService.validateToken(data.token);
  }
}
