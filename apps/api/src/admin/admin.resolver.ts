import { UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import AuthInterceptor from '../common/auth.guard';
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

  @Query()
  @UseInterceptors(AuthInterceptor)
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
