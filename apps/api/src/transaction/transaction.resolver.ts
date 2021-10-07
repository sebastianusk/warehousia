import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentAuth, JwtAuthGuard } from '../auth/auth.guard';
import AuthWrapper from '../auth/auth.wrapper';
import { OutboundResponse, ProductAmountInput } from '../graphql';
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
}
