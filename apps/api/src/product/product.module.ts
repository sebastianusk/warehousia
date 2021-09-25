import { Module } from '@nestjs/common';
import AdminModule from '../admin/admin.module';
import DBModule from '../db/db.module';
import ProductResolver from './product.resolver';
import ProductService from './product.service';

@Module({
  imports: [DBModule, AdminModule],
  providers: [ProductResolver, ProductService],
})
export default class ProductModule {}
