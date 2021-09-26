import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckPolicies } from '../admin/acl.decorator';
import PoliciesGuard from '../admin/acl.guard';
import { AppAbility, Action } from '../admin/factory';
import { CurrentAuth, JwtAuthGuard } from '../auth/auth.guard';
import AuthWrapper from '../auth/auth.wrapper';
import {
  AddWarehouseInput,
  EditWarehouseInput,
  IdPayload,
  PaginationInput,
  ProductAmountInput,
  WarehouseList,
} from '../graphql';
import WarehouseModel, { Feature } from './warehouse.dto';
import WarehouseGuard from './warehouse.guard';
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
  @UseGuards(JwtAuthGuard, WarehouseGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Operate, Feature.INBOUND)
  )
  async addWarehouse(
    @Args('input') input: AddWarehouseInput,
    @CurrentAuth() auth: AuthWrapper
  ): Promise<IdPayload> {
    const id = await this.warehouseService.createWarehouse(
      auth,
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
    ability.can(Action.Update, WarehouseModel)
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

  @Mutation()
  @UseGuards(JwtAuthGuard, WarehouseGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Create, Feature.INBOUND)
  )
  // eslint-disable-next-line class-methods-use-this
  async addInbound(
    @Args('warehouseId') warehouseId: string,
    @Args('items') items: ProductAmountInput[],
    @CurrentAuth() auth: AuthWrapper
  ): Promise<IdPayload> {
    return { id: '' };
  }
}
