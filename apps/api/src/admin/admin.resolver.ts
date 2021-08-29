import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, JwtAuthGuard } from '../auth/auth.guard';
import { AddAdminInput, Admin } from '../graphql';
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
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: any): Promise<Admin> {
    console.log(user);
    const data = await this.adminService.findOne(user.username);
    return data.toResponse();
  }
}
