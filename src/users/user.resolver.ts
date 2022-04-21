import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { LogInDto } from './dto/logIn.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => LogInDto)
  async logIn(
    @Args('login') login: string,
    @Args('password') password: string,
  ): Promise<LogInDto> {
    return await this.userService.logIn(login, password);
  }
}
