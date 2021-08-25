import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import AdminModule from '../admin/admin.module';
import DBModule from '../db/db.module';

@Module({
  imports: [
    DBModule,
    AdminModule,
    GraphQLModule.forRoot({
      mocks: true,
      mockEntireSchema: false,
      playground: true,
      debug: true,
      typePaths: ['./design/spec.graphql'],
      definitions: {
        path: join(process.cwd(), 'apps/api/src/graphql.ts'),
        outputAs: 'class',
      },
      context: ({ req }) => ({ request: req }),
    }),
  ],
})
export default class AppModule {}
