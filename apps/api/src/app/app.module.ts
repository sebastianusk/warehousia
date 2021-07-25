import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      mocks: true,
      playground: true,
      debug: true,
      typePaths: ['./design/spec.graphql'],
      definitions: {
        path: join(process.cwd(), 'apps/api/src/graphql.ts'),
        outputAs: 'class',
      },
    }),
  ],
})
export default class AppModule {}
