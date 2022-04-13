import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogInDto } from './dto/logIn.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async logIn(login: string, password: string): Promise<LogInDto> {
    let user = await this.getUser(login);
    if (!user) {
      user = await this.createUser(login, password);
    }
    return this.generateJWT(user);
  }

  async createUser(login: string, password: string): Promise<User> {
    return await this.userRepository.save({ login, password });
  }

  async generateJWT({ id, login, password }: User): Promise<LogInDto> {
    const jwt = require('jsonwebtoken');
    return {
      accessToken: jwt.sign(
        { id, login, password },
        process.env.JWT_SECRET_KEY,
      ),
    };
  }

  async getUser(login: string): Promise<User> {
    const user = await this.userRepository.findOne({ login });
    return user;
  }
}
