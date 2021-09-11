import { Resolver } from '@nestjs/graphql';
import ShopService from './shop.service';

@Resolver('Shop')
export default class ShopResolver {
  constructor(private shopService: ShopService) {}
}
