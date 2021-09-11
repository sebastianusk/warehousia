import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import AdminModule from '../admin/admin.module';
import AuthModule from '../auth/auth.module';
import DBModule from '../db/db.module';
import ShopModule from '../shop/shop.module';
import WarehouseModule from '../warehouse/warehouse.module';

@Module({
  imports: [
    DBModule,
    AuthModule,
    AdminModule,
    WarehouseModule,
    ShopModule,
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

      context: ({ req }) => ({ request: req }),
    }),
  ],
})
export default class AppModule {}
