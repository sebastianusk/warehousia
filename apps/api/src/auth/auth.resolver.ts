import { Args, Mutation, Resolver } from '@nestjs/graphql';
import AuthService from './auth.service';

@Resolver('Admin')
export default class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation()
  async login(
    @Args('username') username: string,
    @Args('password') password: string
  ) {
    const session = await this.authService.login(username, password);
    return {
      session,
    };
  }
}
