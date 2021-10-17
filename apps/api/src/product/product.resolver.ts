import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAuth, JwtAuthGuard } from '../auth/auth.guard';
import AuthWrapper from '../auth/auth.wrapper';
import { CheckPolicies } from '../auth/policy.decorator';
import { AppAbility, Action } from '../auth/policy.factory';
import PoliciesGuard from '../auth/policy.guard';
import {
  CountPayload,
  IdPayload,
  PaginationInput,
  ProductAutoFillList,
  ProductInput,
  ProductList,
  ProductLogList,
  ProductStock,
  StockProductInput,
} from '../graphql';
import { ProductModel } from './product.dto';
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

  @Query()
  @UseGuards(JwtAuthGuard)
  async products(
    @Args('query') query: string,
    @Args('warehouseId') warehouseId: string,
    @Args('pagination') pagination: PaginationInput
  ): Promise<ProductList> {
    const data = await this.productService.getProducts(
      query,
      warehouseId,
      pagination.limit,
      pagination.offset
    );
    return {
      data: data.map((item) => item.toResponse()),
    };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Create, ProductModel)
  )
  async addProducts(
    @Args('input') input: ProductInput[],
    @CurrentAuth() auth: AuthWrapper
  ): Promise<CountPayload> {
    const count = await this.productService.addProducts(auth, input);
    return { count };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Create, ProductModel)
  )
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
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Action.Update, ProductModel)
  )
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

  @Query()
  @UseGuards(JwtAuthGuard)
  async searchProduct(
    @Args('query') query: string,
    @Args('pagination') pagination: PaginationInput
  ): Promise<ProductAutoFillList> {
    const data = await this.productService.searchProduct(
      query,
      pagination.limit,
      pagination.offset
    );
    return { data };
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async productStock(
    @Args('productId') productId: string
  ): Promise<ProductStock> {
    const data = await this.productService.getProductStock(productId);
    return data.toResponse();
  }
}
