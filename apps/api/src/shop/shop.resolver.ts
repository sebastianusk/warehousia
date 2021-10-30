import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAuth, JwtAuthGuard } from '../auth/auth.guard';
import AuthWrapper from '../auth/auth.wrapper';
import { CheckPolicies } from '../auth/policy.decorator';
import { AppAbility, Action } from '../auth/policy.factory';
import PoliciesGuard from '../auth/policy.guard';
import { AddShopInput, EditShopInput, IdPayload, Shop } from '../graphql';
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
  async shops(@Args('query') query: string): Promise<Shop[]> {
    const data = await this.shopService.getList(query);
    return data.map((item) => item.toResponse());
  }
}
