import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ResponseInterface } from './interfaces/response.interface';
import { TokenService } from './token.service';

@Controller()
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern('gateway.check-token')
  async checkToken(@Payload() data: any): Promise<ResponseInterface> {
    return this.tokenService.validateToken(data.value);
  }
}
