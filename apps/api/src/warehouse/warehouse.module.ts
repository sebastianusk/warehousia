import { Module } from '@nestjs/common';
import AuthModule from '../auth/auth.module';
import DBModule from '../db/db.module';
import WarehouseResolver from './warehouse.resolver';

@Module({
  imports: [DBModule, AuthModule],
  providers: [WarehouseResolver],
})
export default class WarehouseModule {}
