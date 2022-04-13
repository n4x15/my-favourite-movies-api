import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MovieDto } from 'src/tmdbrequest/dto/movie.dto';
import { AuthGuard } from '../authguard/auth.guard';
import { User } from '../user.entity';
import { FavoriteMovies } from './favoriteMovies.entity';
import { FavoriteMoviesService } from './favoriteMovies.service';
import { AxiosResponse } from 'axios';

@Resolver()
@UseGuards(AuthGuard)
export class FavoriteMoviesResolver {
  constructor(private favoriteMoviesService: FavoriteMoviesService) {}

  @Query(() => [MovieDto])
  async getUserMovies(
    @Context('user') user: User,
  ): Promise<MovieDto[]> {
    return this.favoriteMoviesService.getUserMovies(user.login);
  }

  @Mutation(() => FavoriteMovies)
  async addMovie(
    @Args('id') id: number,
    @Context('user') user: User,
  ): Promise<FavoriteMovies> {
    return this.favoriteMoviesService.addMovie(id, user.login);
  }

  @Mutation(() => FavoriteMovies)
  async removeMovie(
    @Args('id') id: number,
    @Context('user') user: User,
  ): Promise<FavoriteMovies> {
    return this.favoriteMoviesService.removeMovie(id, user.login);
  }

  @Mutation(() => FavoriteMovies)
  async setWatched(
    @Args('id') id: number,
    @Context('user') user: User,
  ): Promise<FavoriteMovies> {
    return this.favoriteMoviesService.setWatched(id, user.login);
  }
}
