import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAuth, JwtAuthGuard } from '../auth/auth.guard';
import AuthWrapper from '../auth/auth.wrapper';
import { CheckPolicies } from '../auth/policy.decorator';
import { Action, AppAbility } from '../auth/policy.factory';
import PoliciesGuard from '../auth/policy.guard';
import { FieldEmpty, LoginError } from '../common/errors';
import {
  AddAdminInput,
  Admin,
  AdminLogList,
  AdminPayload,
  ChangeMyPasswordInput,
  EditAdminInput,
  PaginationInput,
} from '../graphql';
import { AdminModel } from './admin.dto';
import AdminService from './admin.service';

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
  async me(@CurrentAuth() user: AuthWrapper): Promise<Admin> {
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
    @Args('limit') limit: number,
    @Args('offset') offset: number
  ): Promise<Admin[]> {
    const list = await this.adminService.getList(query, limit, offset);
    return list.map((item) => item.toResponse());
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
    @CurrentAuth() user: AuthWrapper
  ): Promise<AdminPayload> {
    const userData = await this.adminService.validateUser(
      user.username,
      input.oldPassword
    );
    if (!userData) {
      throw new LoginError();
    }
    if (!input.newPassword) {
      throw new FieldEmpty('newPassword');
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
