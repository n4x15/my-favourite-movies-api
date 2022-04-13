import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { MovieDto } from 'src/tmdbrequest/dto/movie.dto';
import { TmdbRequestService } from 'src/tmdbrequest/tmdbRequest.service';
import { Repository } from 'typeorm';
import { UserService } from '../user.service';
import { FavoriteMovies } from './favoriteMovies.entity';
import { AxiosResponse } from 'axios';

@Injectable()
export class FavoriteMoviesService {
  constructor(
    @InjectRepository(FavoriteMovies)
    private favoriteMoviesRepository: Repository<FavoriteMovies>,
    private userService: UserService,
    private tmdbRequestService: TmdbRequestService,
  ) {}

  async getUserMovies(login: string): Promise<MovieDto[]> {
    const user = await this.userService.getUser(login);
    const userMoviesFromDB = await this.favoriteMoviesRepository.find({
      where: { user },
    });
    const userMovies = await Promise.all(
      userMoviesFromDB.map((movie) =>
        lastValueFrom(this.tmdbRequestService.getMovie(movie.favoriteId)),
      ),
    );
    userMovies.map((movie, index) => {
      movie.isWatched = userMoviesFromDB[index].isWatched;
    });
    return userMovies;
  }

  async addMovie(id: number, login: string): Promise<FavoriteMovies> {
    const user = await this.userService.getUser(login);
    if (
      !(await this.favoriteMoviesRepository.findOne({
        where: { favoriteId: id, user },
      }))
    ) {
      return await this.favoriteMoviesRepository.save({
        favoriteId: id,
        isWatched: false,
        user,
      });
    }
  }

  async removeMovie(id: number, login: string): Promise<FavoriteMovies> {
    const user = await this.userService.getUser(login);
    const movie = await this.favoriteMoviesRepository.findOne({
      where: { favoriteId: id, user },
    });
    await this.favoriteMoviesRepository.remove(movie);
    return movie;
  }

  async setWatched(id: number, login: string): Promise<FavoriteMovies> {
    const user = await this.userService.getUser(login);
    const movie = await this.favoriteMoviesRepository.findOne({
      where: { favoriteId: id, user },
    });
    await this.favoriteMoviesRepository.update(movie.id, {
      isWatched: !movie.isWatched,
    });
    return movie;
  }
}
