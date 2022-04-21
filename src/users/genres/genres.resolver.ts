import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Context, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from '../authguard/auth.guard';
import { CurrentUser } from '../decorator/currentUser.decorator';
import { User } from '../user.entity';
import { Genre } from './genres.entity';
import { GenresService } from './genres.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class GenresResolver {
  constructor(private genresService: GenresService) {}

  @Query(() => [Genre])
  async getUserGenres(@CurrentUser() { login }: User): Promise<Genre[]> {
    return await this.genresService.getUserGenres(login);
  }

  @Mutation(() => User)
  async addGenres(
    @Args('id') id: number,
    @CurrentUser() { login }: User,
  ): Promise<User> {
    return await this.genresService.addGenres(id, login);
  }

  @Mutation(() => User)
  async removeGenres(
    @Args('id') id: number,
    @CurrentUser() { login }: User,
  ): Promise<User> {
    return await this.genresService.removeGenres(id, login);
  }
}
