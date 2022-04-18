import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { MovieDto } from 'src/tmdbrequest/dto/movie.dto';
import { TmdbRequestService } from 'src/tmdbrequest/tmdbRequest.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { UserService } from '../user.service';
import { FavoriteMovie } from './favoriteMovies.entity';

@Injectable()
export class FavoriteMoviesService {
  constructor(
    @InjectRepository(FavoriteMovie)
    private favoriteMoviesRepository: Repository<FavoriteMovie>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
    private tmdbRequestService: TmdbRequestService,
  ) {}

  async getUserMovies(login: string): Promise<MovieDto[]> {
    const user = await this.userService.getUser(login);
    const userMovies = await Promise.all(
      user.favoriteMovies.map((movie) =>
        lastValueFrom(this.tmdbRequestService.getMovie(movie.favoriteId)),
      ),
    );
    userMovies.map((movie, index) => {
      movie.isWatched = user.favoriteMovies[index].isWatched;
    });
    return userMovies;
  }

  async addMovie(id: number, login: string): Promise<User> {
    const user = await this.userService.getUser(login);
    const movieExist = user.favoriteMovies.find(
      (movie) => movie.favoriteId === id,
    );
    if (!movieExist) {
      const favoriteMovie = this.favoriteMoviesRepository.create({
        favoriteId: id,
      });
      user.favoriteMovies.push(favoriteMovie);
      return await this.userRepository.save(user);
    }
  }

  async removeMovie(id: number, login: string): Promise<User> {
    const user = await this.userService.getUser(login);
    user.favoriteMovies = user.favoriteMovies.filter(
      (movie) => movie.favoriteId != id,
    );
    return await this.userRepository.save(user);
  }

  async setWatched(id: number, login: string): Promise<User> {
    const user = await this.userService.getUser(login);
    user.favoriteMovies.map(
      (movie) =>
        movie.favoriteId === id && (movie.isWatched = !movie.isWatched),
    );
    return await this.userRepository.save(user);
  }
}
