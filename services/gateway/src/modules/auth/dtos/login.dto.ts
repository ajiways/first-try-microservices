import { Length } from 'class-validator';
import { Type } from 'class-transformer';

export class LoginDto {
  @Type(() => String)
  @Length(4, 16)
  login: string;

  @Type(() => String)
  @Length(6, 16)
  password: string;
}
