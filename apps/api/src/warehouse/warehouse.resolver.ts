import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput, WarehouseList } from '../graphql';
import WarehouseService from './warehouse.service';

@Resolver('Warehouse')
export default class WarehouseResolver {
  constructor(private warehouseService: WarehouseService) {}

  @Query()
  async warehouses(
    @Args('query') query: string,
    @Args('pagination') pagination: PaginationInput
  ): Promise<WarehouseList> {
    const data = await this.warehouseService.getList(
      query,
      pagination?.limit,
      pagination?.offset
    );
    return {
      data: data.map((item) => item.toResponse()),
    };
  }
}
