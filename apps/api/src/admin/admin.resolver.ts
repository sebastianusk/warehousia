import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, JwtAuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import RolesGuard from '../auth/roles.guard';
import { AddAdminInput, Admin } from '../graphql';
import { RoleModel } from './admin.dto';
import AdminService from './admin.service';

@Resolver('Admin')
export default class AdminResolver {
  constructor(private adminService: AdminService) {}

  @Mutation()
  @Roles(RoleModel.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addAdmin(@Args('input') input: AddAdminInput) {
    const username = await this.adminService.addAdmin(input);
    return {
      username,
    };
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: any): Promise<Admin> {
    const data = await this.adminService.findOne(user.username);
    return data.toResponse();
  }
}
