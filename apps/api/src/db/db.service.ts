import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClient } from '.prisma/client';

export enum DBError {
  UNIQUE_CONSTRAINT = 'P2002',
  DEPENDENT_NOT_FOUND = 'P2025',
}

@Injectable()
export default class DBService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  static handleError(
    err: any,
    cases: { code: DBError; func: (err: any) => never }[]
  ) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      cases?.forEach((item) => {
        if (err.code === item.code) {
          item.func(err);
        }
      });
    }
    throw err;
  }
}
