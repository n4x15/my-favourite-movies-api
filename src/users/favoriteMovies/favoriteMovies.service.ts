import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { MovieDto } from 'src/tmdbrequest/dto/movie.dto';
import { ResponseMovieDto } from 'src/tmdbrequest/dto/response.movie.dto';
import { TmdbRequestService } from 'src/tmdbrequest/tmdbRequest.service';
import { GetMoviesArgs } from 'src/utils/types/movieListInterface';
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

  async getUserMovies(login: string, language: string): Promise<MovieDto[]> {
    const user = await this.userService.getUser(login);
    const moviesId = [];
    const userMovies = await Promise.all(
      user.favoriteMovies.map((movie) =>
        lastValueFrom(
          this.tmdbRequestService.getMovie(movie.favoriteId, language),
        ),
      ),
    );
    user.favoriteMovies.forEach(
      (movie) => movie.isWatched && moviesId.push(movie.favoriteId),
    );
    userMovies.map((movie) => {
      moviesId.includes(movie.id) && (movie.isWatched = true);
    });
    return userMovies;
  }

  async getMovies(
    login: string,
    filters: GetMoviesArgs,
  ): Promise<ResponseMovieDto> {
    const user = await this.userService.getUser(login);
    const moviesId = [];
    user.favoriteMovies.forEach((movie) => moviesId.push(movie.favoriteId));
    const userMovies = await lastValueFrom(
      this.tmdbRequestService.getMovies(filters),
    );
    userMovies.results.map(
      (movie) => moviesId.includes(movie.id) && (movie.isSaved = true),
    );
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
        user: user,
      });
      user.favoriteMovies.push(favoriteMovie);
      return await this.userRepository.save(user);
    } else {
      throw new HttpException('Movie is already added', HttpStatus.BAD_REQUEST);
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
    user.favoriteMovies.find(
      (movie) =>
        movie.favoriteId === id && (movie.isWatched = !movie.isWatched),
    );
    return await this.userRepository.save(user);
  }
}
