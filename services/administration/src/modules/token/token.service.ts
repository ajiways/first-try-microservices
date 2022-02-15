import { Injectable } from '@nestjs/common';
import { userData } from './interfaces/userData.interface';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { ResponseInterface } from './interfaces/response.interface';
import { SECRET } from '../../misc/service';

@Injectable()
export class TokenService {
  generateToken(payload: userData): string {
    return sign({ payload }, SECRET);
  }

  validateToken(token: unknown): ResponseInterface | null {
    try {
      const res = verify(String(token), SECRET) as JwtPayload;

      return {
        id: res.payload.id,
        password: res.payload.password,
      };
    } catch (error) {
      return null;
    }
  }
}
