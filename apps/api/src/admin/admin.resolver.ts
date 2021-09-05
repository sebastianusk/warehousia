import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, JwtAuthGuard } from '../auth/auth.guard';
import { LoginError } from '../common/errors';
import {
  AddAdminInput,
  Admin,
  AdminList,
  AdminLogList,
  AdminPayload,
  ChangeMyPasswordInput,
  EditAdminInput,
  PaginationInput,
} from '../graphql';
import { CheckPolicies } from './acl.decorator';
import PoliciesGuard from './acl.guard';
import { AdminModel } from './admin.dto';
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
    @Args('pagination') pagination: PaginationInput
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

  @Query()
  async adminLogs(
    @Args('username') username: string,
    @Args('pagination') pagination: PaginationInput
  ): Promise<AdminLogList> {
    const data = await this.adminService.getLogs(
      username,
      pagination ? pagination.limit : undefined,
      pagination ? pagination.offset : undefined
    );
    return { data: data.map((item) => item.toResponse()) };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, AdminModel)
  )
  async editAdmin(@Args('input') input: EditAdminInput): Promise<AdminPayload> {
    const username = await this.adminService.editAdmin(
      input.username,
      AdminModel.fromStringRole(input.role),
      input.warehouses,
      input.active,
      input.password
    );
    return {
      username,
    };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async changeMyPassword(
    @Args('input') input: ChangeMyPasswordInput,
    @CurrentUser() user: any
  ): Promise<AdminPayload> {
    const userData = await this.adminService.validateUser(
      user.username,
      input.oldPassword
    );
    if (!userData) {
      throw new LoginError();
    }
    const username = await this.adminService.editAdmin(
      user.username,
      undefined,
      undefined,
      undefined,
      input.newPassword
    );
    return { username };
  }
}
