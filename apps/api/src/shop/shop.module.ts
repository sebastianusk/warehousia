import { Module } from '@nestjs/common';
import AdminModule from '../admin/admin.module';
import DBModule from '../db/db.module';
import ShopResolver from './shop.resolver';
import ShopService from './shop.service';

@Module({
  imports: [DBModule, AdminModule],
  providers: [ShopResolver, ShopService],
})
export default class ShopModule {}
