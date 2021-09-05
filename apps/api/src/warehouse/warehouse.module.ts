import { Module } from '@nestjs/common';
import DBModule from '../db/db.module';
import WarehouseResolver from './warehouse.resolver';
import WarehouseService from './warehouse.service';

@Module({
  imports: [DBModule],
  providers: [WarehouseResolver, WarehouseService],
})
export default class WarehouseModule {}
