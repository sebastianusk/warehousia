import { Module } from '@nestjs/common';
import AdminModule from '../admin/admin.module';
import DBModule from '../db/db.module';
import WarehouseResolver from './warehouse.resolver';
import WarehouseService from './warehouse.service';

@Module({
  imports: [DBModule, AdminModule],
  providers: [WarehouseResolver, WarehouseService],
})
export default class WarehouseModule {}
