import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddAdminInput } from '../graphql';
import AdminService from './admin.service';

@Resolver('Admin')
export default class AdminResolver {
  constructor(private adminService: AdminService) {}

  @Mutation()
  async addAdmin(@Args('input') input: AddAdminInput) {
    const username = await this.adminService.addAdmin(input);
    return {
      username,
    };
  }

  @Mutation()
  async login(
    @Args('username') username: string,
    @Args('password') password: string
  ) {
    const session = await this.adminService.login(username, password);
    return {
      session,
    };
  }
}
