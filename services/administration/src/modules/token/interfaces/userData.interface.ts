import { JwtPayload } from 'jsonwebtoken';

export interface userData extends JwtPayload {
  id: number;
  firstName: string;
  password: string;
}
