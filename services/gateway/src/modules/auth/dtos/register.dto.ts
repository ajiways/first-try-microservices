import { Type } from 'class-transformer';
import { IsPhoneNumber, Length } from 'class-validator';

export class RegisterDto {
  @Type(() => String)
  @Length(4, 16)
  login: string;

  @Type(() => String)
  @Length(6, 16)
  password: string;

  @IsPhoneNumber()
  phone: string;

  @Type(() => String)
  @Length(2, 16)
  firstName: string;

  @Type(() => String)
  @Length(3, 16)
  lastName: string;

  @Type(() => String)
  @Length(4, 16)
  patronymic: string;
}
