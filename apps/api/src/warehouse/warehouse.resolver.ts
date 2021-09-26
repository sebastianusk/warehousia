import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAuth, JwtAuthGuard } from '../auth/auth.guard';
import AuthWrapper from '../auth/auth.wrapper';
import { CheckPolicies } from '../auth/policy.decorator';
import { AppAbility, Action } from '../auth/policy.factory';
import PoliciesGuard from '../auth/policy.guard';
import {
  AddWarehouseInput,
  EditWarehouseInput,
  IdPayload,
  InboundList,
  PaginationInput,
  ProductAmountInput,
  TransferList,
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
    ability.can(Action.Create, WarehouseModel)
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
  async addInbound(
    @Args('warehouseId') warehouseId: string,
    @Args('items') items: ProductAmountInput[],
    @CurrentAuth() auth: AuthWrapper
  ): Promise<IdPayload> {
    const id = await this.warehouseService.addInbound(
      auth,
      warehouseId,
      items.map((item) => ({ amount: item.amount, productid: item.productId }))
    );
    return { id };
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async inbounds(
    @Args('warehouseId') warehouseId: string,
    @Args('pagination') pagination: PaginationInput
  ): Promise<InboundList> {
    const data = await this.warehouseService.getInbounds(
      warehouseId,
      pagination.offset,
      pagination.limit
    );
    return { data: data.map((item) => item.toResponse()) };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, WarehouseGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Create, Feature.INBOUND)
  )
  async addTransfer(
    @Args('warehouseId') warehouseId: string,
    @Args('destinationId') destinationId: string,
    @Args('items') items: ProductAmountInput[],
    @CurrentAuth() auth: AuthWrapper
  ): Promise<IdPayload> {
    const id = await this.warehouseService.addTransfer(
      auth,
      warehouseId,
      destinationId,
      items
    );
    return { id };
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async transfers(
    @Args('warehouseId') warehouseId: string,
    @Args('destinationId') destinationId: string,
    @Args('pagination') pagination: PaginationInput
  ): Promise<TransferList> {
    const data = await this.warehouseService.getTransfers(
      warehouseId,
      destinationId,
      pagination.offset,
      pagination.limit
    );
    return { data: data.map((item) => item.toResponse()) };
  }
}
