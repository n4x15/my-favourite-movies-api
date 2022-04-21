import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogInDto } from './dto/logIn.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from 'src/utils/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async logIn(login: string, password: string): Promise<LogInDto> {
    let user = await this.getUser(login);
    if (user) {
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
      }
    } else {
      user = await this.createUser(login, password);
    }
    const payload = { login: user.login, sub: user.id };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async createUser(login: string, password: string): Promise<User> {
    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    return await this.userRepository.save({ login, password: hashPassword });
  }

  async getUser(login: string): Promise<User> {
    const user = await this.userRepository.findOne(
      { login },
      { relations: ['favoriteMovies', 'genres'] },
    );
    return user;
  }
}
