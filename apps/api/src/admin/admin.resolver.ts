import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import AuthGuard from '../common/auth.guard';
import { AddAdminInput, Admin, Role } from '../graphql';
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

  @Query()
  @UseGuards(AuthGuard)
  async me(): Promise<Admin> {
    return {
      username: 'Bubur',
      role: Role.SUPER_ADMIN,
      warehouses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}
