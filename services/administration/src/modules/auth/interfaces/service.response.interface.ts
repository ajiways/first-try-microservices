import { HttpStatus } from '@nestjs/common';

export interface IServiceReponse {
  message: string;
  token?: string;
  status: HttpStatus;
}
