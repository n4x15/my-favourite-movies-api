import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MovieDto } from 'src/tmdbrequest/dto/movie.dto';
import { AuthGuard } from '../authguard/auth.guard';
import { User } from '../user.entity';
import { FavoriteMovie } from './favoriteMovies.entity';
import { FavoriteMoviesService } from './favoriteMovies.service';

@Resolver()
@UseGuards(AuthGuard)
export class FavoriteMoviesResolver {
  constructor(private favoriteMoviesService: FavoriteMoviesService) {}

  @Query(() => [MovieDto])
  async getUserMovies(@Context('user') user: User): Promise<MovieDto[]> {
    return this.favoriteMoviesService.getUserMovies(user.login);
  }

  @Mutation(() => User)
  async addMovie(
    @Args('id') id: number,
    @Context('user') user: User,
  ): Promise<User> {
    return this.favoriteMoviesService.addMovie(id, user.login);
  }

  @Mutation(() => User)
  async removeMovie(
    @Args('id') id: number,
    @Context('user') user: User,
  ): Promise<User> {
    return this.favoriteMoviesService.removeMovie(id, user.login);
  }

  @Mutation(() => User)
  async setWatched(
    @Args('id') id: number,
    @Context('user') user: User,
  ): Promise<User> {
    return this.favoriteMoviesService.setWatched(id, user.login);
  }
}
