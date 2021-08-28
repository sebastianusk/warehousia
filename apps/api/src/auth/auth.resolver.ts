import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import AuthService from './auth.service';

@Resolver('Admin')
export default class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation()
  async login(
    @Args('username') username: string,
    @Args('password') password: string
  ) {
    const user = this.authService.validateUser(username, password);
    if (!user) {
      throw new AuthenticationError('username/password wrong');
    }
    const session = await this.authService.login(user);
    return {
      session,
    };
  }
}
