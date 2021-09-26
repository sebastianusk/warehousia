import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import WarehouseService from './warehouse.service';

@Injectable()
export default class WarehouseGuard implements CanActivate {
  constructor(private warehouseService: WarehouseService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const ctx = GqlExecutionContext.create(context);
    const { warehouseId } = ctx.getArgs();
    if (!warehouseId) return false;
    const warehouse = await this.warehouseService.getWarehouse(warehouseId);
    if (!warehouse) return false;
    ctx.getContext().warehouse = warehouse;
    return true;
  }
}
