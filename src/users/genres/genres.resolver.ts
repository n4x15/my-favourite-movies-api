import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Context, Query } from '@nestjs/graphql';
import { AuthGuard } from '../authguard/auth.guard';
import { User } from '../user.entity';
import { Genre } from './genres.entity';
import { GenresService } from './genres.service';

@Resolver()
@UseGuards(AuthGuard)
export class GenresResolver {
  constructor(private genresService: GenresService) {}

  @Query(() => [Genre])
  async getUserGenres(@Context('user') user: User): Promise<Genre[]> {
    return await this.genresService.getUserGenres(user.login);
  }

  @Mutation(() => User)
  async addGenres(
    @Args('id') id: number,
    @Context('user') user: User,
  ): Promise<User> {
    return await this.genresService.addGenres(id, user.login);
  }

  @Mutation(() => User)
  async removeGenres(
    @Args('id') id: number,
    @Context('user') user: User,
  ): Promise<User> {
    return await this.genresService.removeGenres(id, user.login);
  }
}
