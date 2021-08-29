import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginError } from '../common/errors';
import AuthService from './auth.service';

@Resolver('Admin')
export default class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation()
  async login(
    @Args('username') username: string,
    @Args('password') password: string
  ) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new LoginError();
    }
    const session = await this.authService.login(user);
    return {
      session,
    };
  }
}
