import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, JwtAuthGuard } from '../auth/auth.guard';
import {
  AddAdminInput,
  Admin,
  AdminList,
  OffsetPaginationInput,
} from '../graphql';
import { CheckPolicies } from './acl.decorator';
import PoliciesGuard from './acl.guard';
import AdminModel from './admin.dto';
import AdminService from './admin.service';
import { Action, AppAbility } from './factory';

@Resolver('Admin')
export default class AdminResolver {
  constructor(private adminService: AdminService) {}

  @Mutation()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, AdminModel)
  )
  async addAdmin(@Args('input') input: AddAdminInput) {
    const username = await this.adminService.addAdmin(
      input.username,
      input.password,
      input.warehouse,
      input.role
    );
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

  @Query()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Manage, AdminModel)
  )
  async admins(
    @Args('query') query: string,
    @Args('pagination') pagination: OffsetPaginationInput
  ): Promise<AdminList> {
    const list = await this.adminService.getList(
      query,
      pagination.limit,
      pagination.offset
    );
    return {
      data: list.map((item) => item.toResponse()),
    };
  }
}
