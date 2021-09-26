import { Module } from '@nestjs/common';
import AuthModule from '../auth/auth.module';
import DBModule from '../db/db.module';
import ShopResolver from './shop.resolver';
import ShopService from './shop.service';

@Module({
  imports: [DBModule, AuthModule],
  providers: [ShopResolver, ShopService],
})
export default class ShopModule {}
