import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentAuth, JwtAuthGuard } from '../auth/auth.guard';
import AuthWrapper from '../auth/auth.wrapper';
import { CountPayload, IdPayload, ProductInput } from '../graphql';
import ProductService from './product.service';

@Resolver('Products')
export default class ProductResolver {
  constructor(private productService: ProductService) {}

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
}
