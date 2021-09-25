import { Module } from '@nestjs/common';
import AdminModule from '../admin/admin.module';
import DBModule from '../db/db.module';
import ShopResolver from '../shop/shop.resolver';
import ProductResolver from './product.resolver';

@Module({
  imports: [DBModule, AdminModule],
  exports: [ProductResolver, ShopResolver],
})
export default class ProductModule {}
