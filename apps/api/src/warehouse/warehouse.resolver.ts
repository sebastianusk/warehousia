import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckPolicies } from '../admin/acl.decorator';
import PoliciesGuard from '../admin/acl.guard';
import { AdminModel } from '../admin/admin.dto';
import { AppAbility, Action } from '../admin/factory';
import { CurrentAuth, CurrentUser, JwtAuthGuard } from '../auth/auth.guard';
import AuthWrapper from '../auth/auth.wrapper';
import {
  AddWarehouseInput,
  EditWarehouseInput,
  IdPayload,
  PaginationInput,
  WarehouseList,
} from '../graphql';
import WarehouseModel from './warehouse.dto';
import WarehouseService from './warehouse.service';

@Resolver('Warehouse')
export default class WarehouseResolver {
  constructor(private warehouseService: WarehouseService) {}

  @Query()
  @UseGuards(JwtAuthGuard)
  async warehouses(
    @Args('query') query: string,
    @Args('pagination') pagination: PaginationInput
  ): Promise<WarehouseList> {
    const data = await this.warehouseService.getList(
      query,
      pagination?.limit,
      pagination?.offset
    );
    return {
      data: data.map((item) => item.toResponse()),
    };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, AdminModel)
  )
  async addWarehouse(
    @Args('input') input: AddWarehouseInput,
    @CurrentUser() user: any
  ): Promise<IdPayload> {
    const id = await this.warehouseService.createWarehouse(
      user.username,
      input.id,
      input.name,
      input.features.map((item) => WarehouseModel.fromFeatureString(item))
    );
    return {
      id,
    };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, AdminModel)
  )
  async editWarehouse(
    @Args('input') input: EditWarehouseInput,
    @CurrentAuth() auth: AuthWrapper
  ): Promise<IdPayload> {
    const id = await this.warehouseService.editWarehouse(
      auth,
      input.id,
      input.name,
      input.features?.map((item) => WarehouseModel.fromFeatureString(item)),
      input.active
    );
    return {
      id,
    };
  }
}
