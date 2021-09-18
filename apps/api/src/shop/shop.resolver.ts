import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckPolicies } from '../admin/acl.decorator';
import PoliciesGuard from '../admin/acl.guard';
import { AppAbility, Action } from '../admin/factory';
import { CurrentAuth, JwtAuthGuard } from '../auth/auth.guard';
import AuthWrapper from '../auth/auth.wrapper';
import {
  AddShopInput,
  EditShopInput,
  IdPayload,
  PaginationInput,
  ShopList,
} from '../graphql';
import ShopModel from './shop.dto';
import ShopService from './shop.service';

@Resolver('Shop')
export default class ShopResolver {
  constructor(private shopService: ShopService) {}

  @Mutation()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, ShopModel))
  async addShop(
    @Args('input') input: AddShopInput,
    @CurrentAuth() auth: AuthWrapper
  ): Promise<IdPayload> {
    const id = await this.shopService.createShop(auth, input.id, input.name);
    return { id };
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, ShopModel))
  async editShop(
    @Args('input') input: EditShopInput,
    @CurrentAuth() auth: AuthWrapper
  ): Promise<IdPayload> {
    const id = await this.shopService.editShop(
      auth,
      input.id,
      input.name,
      input.active
    );
    return { id };
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async shops(
    @Args('query') query: string,
    @Args('pagination') pagination: PaginationInput
  ): Promise<ShopList> {
    const data = await this.shopService.getList(
      query,
      pagination?.limit,
      pagination?.offset
    );
    return {
      data: data.map((item) => item.toResponse()),
    };
  }
}
