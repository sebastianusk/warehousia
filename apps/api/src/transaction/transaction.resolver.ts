import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAuth, JwtAuthGuard } from '../auth/auth.guard';
import AuthWrapper from '../auth/auth.wrapper';
import { CheckPolicies } from '../auth/policy.decorator';
import { Action, AppAbility } from '../auth/policy.factory';
import PoliciesGuard from '../auth/policy.guard';
import {
  Demand,
  IdPayload,
  Outbound,
  OutboundResponse,
  PreparationList,
  ProductAmountInput,
  Transaction,
  TransactionResponse,
} from '../graphql';
import { Feature } from '../warehouse/warehouse.dto';
import WarehouseGuard from '../warehouse/warehouse.guard';
import TransactionService from './transaction.service';

@Resolver('Transaction')
export default class TransactionResolver {
  constructor(private transactionService: TransactionService) {}

  @Mutation()
  @UseGuards(JwtAuthGuard, WarehouseGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Create, Feature.OUTBOUND)
  )
  async addOutbound(
    @CurrentAuth() auth: AuthWrapper,
    @Args('warehouseId') warehouseId: string,
    @Args('shopId') shopId: string,
    @Args('items') items: ProductAmountInput[]
  ): Promise<OutboundResponse> {
    const { demands, outbounds } = await this.transactionService.createOutbound(
      auth,
      warehouseId,
      shopId,
      items
    );
    return {
      outbounds: outbounds.map((id) => ({ id })),
      demands: demands.map((id) => ({ id })),
    };
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async outbounds(
    @Args('warehouseId') warehouseId: string
  ): Promise<Outbound[]> {
    const data = await this.transactionService.getOutbounds(warehouseId);
    return data.map((item) => item.toResponse());
  }

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async addPreparation(
    @CurrentAuth() auth: AuthWrapper,
    @Args('warehouseId') warehouseId: string,
    @Args('shopId') shopId: string[]
  ): Promise<IdPayload> {
    const id = await this.transactionService.createPreparation(
      auth,
      warehouseId,
      shopId
    );
    return { id };
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async preparations(
    @Args('query') query: string,
    @Args('warehouseId') warehouseId: string
  ): Promise<PreparationList> {
    const data = await this.transactionService.getPreparations(
      query,
      warehouseId
    );
    return {
      data: data.map((item) => item.toResponse()),
    };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async addMissing(
    @CurrentAuth() auth: AuthWrapper,
    @Args('preparationId') preparationId: string,
    @Args('productId') productId: string,
    @Args('amount') amount: number
  ): Promise<IdPayload> {
    const id = await this.transactionService.createMissing(
      auth,
      preparationId,
      productId,
      amount
    );
    return { id };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async addTransaction(
    @CurrentAuth() auth: AuthWrapper,
    @Args('preparationId') preparationId: string,
    @Args('remarks') remarks: string = ''
  ): Promise<TransactionResponse> {
    const { id, warehouseId, shops, createdBy, createdAt, items, failed } =
      await this.transactionService.createTransaction(
        auth,
        preparationId,
        remarks
      );
    return {
      id,
      warehouseId,
      createdBy,
      shops,
      createdAt: createdAt.toISOString(),
      items,
      failed,
    };
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async transactions(
    @Args('query') query: string,
    @Args('warehouseId') warehouseId: string,
    @Args('limit') limit: number,
    @Args('offset') offset: number
  ): Promise<TransactionResponse[]> {
    const data = await this.transactionService.getTransactions(
      query,
      warehouseId,
      offset,
      limit
    );
    return data.map((item) => item.toResponse());
  }
}
