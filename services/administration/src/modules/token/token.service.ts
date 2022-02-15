import { Injectable } from '@nestjs/common';
import { userData } from './interfaces/userData.interface';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { ResponseInterface } from './interfaces/response.interface';

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService) {}

  generateToken(payload: userData): string {
    return sign({ payload }, this.configService.get('SECRET'));
  }

  validateToken(token: unknown): ResponseInterface | null {
    try {
      const res = verify(
        String(token),
        this.configService.get('SECRET'),
      ) as JwtPayload;

      return {
        id: res.payload.id,
        password: res.payload.password,
      };
    } catch (error) {
      return null;
    }
  }
}
