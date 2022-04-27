import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { UserService } from '../user.service';
import { Genre } from './genres.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
  ) {}

  async getUserGenres(login: string): Promise<Genre[]> {
    const { genres } = await this.userService.getUser(login);
    return genres;
  }

  async addGenres(id: number, login: string): Promise<User> {
    const user = await this.userService.getUser(login);
    const genreExist = user.genres.find((genre) => genre.genreId === id);
    if (!genreExist) {
      const genre = this.genresRepository.create({ genreId: id, user: user });
      user.genres.push(genre);
    } else {
      user.genres = user.genres.filter((genre) => genre.genreId != id);
    }
    return this.userRepository.save(user);
  }

  async removeGenres(id: number, login: string): Promise<User> {
    const user = await this.userService.getUser(login);
    user.genres = user.genres.filter((genre) => genre.genreId != id);
    return await this.userRepository.save(user);
  }
}
