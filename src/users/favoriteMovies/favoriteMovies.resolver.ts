import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MovieDto } from 'src/tmdbrequest/dto/movie.dto';
import { MoviesInputDto } from 'src/tmdbrequest/dto/moviesInput.dto';
import { ResponseMovieDto } from 'src/tmdbrequest/dto/response.movie.dto';
import { GqlAuthGuard } from '../authguard/auth.guard';
import { CurrentUser } from '../decorator/currentUser.decorator';
import { User } from '../user.entity';
import { FavoriteMoviesService } from './favoriteMovies.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class FavoriteMoviesResolver {
  constructor(private favoriteMoviesService: FavoriteMoviesService) {}

  @Query(() => [MovieDto])
  async getUserMovies(@CurrentUser() { login }: User, @Args('language') language: string): Promise<MovieDto[]> {
    return this.favoriteMoviesService.getUserMovies(login, language);
  }

  @Mutation(() => User)
  async addMovie(
    @Args('id') id: number,
    @CurrentUser() { login }: User,
  ): Promise<User> {
    return this.favoriteMoviesService.addMovie(id, login);
  }

  @Mutation(() => User)
  async removeMovie(
    @Args('id') id: number,
    @CurrentUser() { login }: User,
  ): Promise<User> {
    return this.favoriteMoviesService.removeMovie(id, login);
  }

  @Mutation(() => User)
  async setWatched(
    @Args('id') id: number,
    @CurrentUser() { login }: User,
  ): Promise<User> {
    return this.favoriteMoviesService.setWatched(id, login);
  }

  @Query(() => ResponseMovieDto, { name: 'Movies' })
  async getMovies(
    @Args('filters') filters: MoviesInputDto,
    @CurrentUser() { login }: User,
  ): Promise<ResponseMovieDto> {
    return this.favoriteMoviesService.getMovies(login, filters);
  }
}
