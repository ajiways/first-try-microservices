import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { TokenService } from '../token/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
