import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAuth, JwtAuthGuard } from '../auth/auth.guard';
import AuthWrapper from '../auth/auth.wrapper';
import {
  CountPayload,
  IdPayload,
  PaginationInput,
  ProductInput,
  ProductLogList,
  StockProductInput,
} from '../graphql';
import ProductService from './product.service';

@Resolver('Products')
export default class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query()
  @UseGuards(JwtAuthGuard)
  async productLog(
    @Args('productId') productId: string,
    @Args('pagination') pagination: PaginationInput
  ): Promise<ProductLogList> {
    const data = await this.productService.getProductLog(
      productId,
      pagination.limit,
      pagination.offset
    );
    return {
      data: data.map((item) => item.toResponse()),
    };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async addProducts(
    @Args('input') input: ProductInput[],
    @CurrentAuth() auth: AuthWrapper
  ): Promise<CountPayload> {
    const count = await this.productService.addProducts(auth, input);
    return { count };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async editProduct(
    @Args('input') input: ProductInput,
    @CurrentAuth() auth: AuthWrapper
  ): Promise<IdPayload> {
    const id = await this.productService.editProduct(
      auth,
      input.id,
      input.name
    );
    return { id };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async editProductStock(
    @Args('input') input: StockProductInput,
    @CurrentAuth() auth: AuthWrapper
  ): Promise<string> {
    const id = await this.productService.editStockProduct(
      auth,
      input.id,
      input.warehouse,
      input.stock
    );
    return id;
  }
}
