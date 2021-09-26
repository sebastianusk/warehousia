import { Module } from '@nestjs/common';
import AuthModule from '../auth/auth.module';
import DBModule from '../db/db.module';
import ProductResolver from './product.resolver';
import ProductService from './product.service';

@Module({
  imports: [DBModule, AuthModule],
  providers: [ProductResolver, ProductService],
})
export default class ProductModule {}
