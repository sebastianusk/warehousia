import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAuth, JwtAuthGuard } from '../auth/auth.guard';
import AuthWrapper from '../auth/auth.wrapper';
import {
  DemandList,
  IdPayload,
  OutboundList,
  OutboundResponse,
  PaginationInput,
  PreparationList,
  ProductAmountInput,
  TransactionList,
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

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async addPreparation(
    @CurrentAuth() auth: AuthWrapper,
    @Args('warehouseId') warehouseId: string,
    @Args('shopId') shopId: string
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
    @Args('warehouseId') warehouseId: string,
    @Args('shopId') shopId: string
  ): Promise<PreparationList> {
    const data = await this.transactionService.getPreparations(
      query,
      warehouseId,
      shopId
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
    @Args('remarks') remarks: string
  ): Promise<IdPayload> {
    const id = await this.transactionService.createTransaction(
      auth,
      preparationId,
      remarks
    );
    return { id };
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async transactions(
    @CurrentAuth() auth: AuthWrapper,
    @Args('productId') productId: string,
    @Args('warehouseId') warehouseId: string,
    @Args('shopId') shopId: string,
    @Args('pagination') pagination: PaginationInput
  ): Promise<TransactionList> {
    const data = await this.transactionService.getTransactions(
      productId,
      warehouseId,
      shopId,
      pagination.offset,
      pagination.limit
    );
    return { data: data.map((item) => item.toResponse()) };
  }
}
