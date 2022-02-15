import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { IParams } from './interfaces/params.interface';
import { RegisterDto } from '../auth/dtos/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOneWithParams(params: IParams) {
    const result = await this.userRepository.findOne({ ...params });

    if (!result) {
      return false;
    }

    return result;
  }

  async findAllWithParams(params?: IParams) {
    return await this.userRepository.find({ ...params });
  }

  async createUser(user: RegisterDto) {
    return await this.userRepository.save(user);
  }
}
