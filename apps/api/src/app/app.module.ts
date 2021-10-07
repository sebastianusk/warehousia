import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import AdminModule from '../admin/admin.module';
import AuthModule from '../auth/auth.module';
import DBModule from '../db/db.module';
import ProductModule from '../product/product.module';
import ShopModule from '../shop/shop.module';
import TransactionModule from '../transaction/transaction.module';
import WarehouseModule from '../warehouse/warehouse.module';

@Module({
  imports: [
    DBModule,
    AuthModule,
    AdminModule,
    WarehouseModule,
    ShopModule,
    ProductModule,
    TransactionModule,
    GraphQLModule.forRoot({
      typePaths: ['./design/spec.graphql'],
      definitions: {
        path: join(process.cwd(), 'apps/api/src/graphql.ts'),
        outputAs: 'class',
      },
      mocks: true,
      mockEntireSchema: false,
      playground: true,
      debug: true,
      cors: true,
      context: ({ req }) => ({ request: req }),
    }),
  ],
})
export default class AppModule {}
