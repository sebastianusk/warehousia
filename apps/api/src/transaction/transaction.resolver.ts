import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAuth, JwtAuthGuard } from '../auth/auth.guard';
import AuthWrapper from '../auth/auth.wrapper';
import {
  DemandList,
  OutboundList,
  OutboundResponse,
  PaginationInput,
  ProductAmountInput,
} from '../graphql';
import TransactionService from './transaction.service';

@Resolver('Transaction')
export default class TransactionResolver {
  constructor(private transactionService: TransactionService) {}

  @Mutation()
  @UseGuards(JwtAuthGuard)
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
    @Args('warehouseId') warehouseId: string,
    @Args('shopId') shopId: string,
    @Args('pagination') pagination: PaginationInput
  ): Promise<OutboundList> {
    const data = await this.transactionService.getOutbounds(
      warehouseId,
      shopId,
      pagination.offset,
      pagination.limit
    );
    return {
      data: data.map((item) => item.toResponse()),
    };
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async demands(
    @Args('warehouseId') warehouseId: string,
    @Args('shopId') shopId: string,
    @Args('pagination') pagination: PaginationInput
  ): Promise<DemandList> {
    const data = await this.transactionService.getDemands(
      warehouseId,
      shopId,
      pagination.limit,
      pagination.offset
    );
    return {
      data: data.map((item) => item.toResponse()),
    };
  }
}
