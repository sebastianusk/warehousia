import { Injectable } from '@nestjs/common';
import AuthWrapper from '../auth/auth.wrapper';
import DBService from '../db/db.service';

@Injectable()
export default class ShopService {
  constructor(private db: DBService) {}

  async createShop(
    auth: AuthWrapper,
    id: string,
    name: string
  ): Promise<string> {
    const result = await this.db.$transaction([
      this.db.shop.create({ data: { id, name } }),
      auth.log(this.db, 'createShop', { id }),
    ]);
    return result[0].id;
  }
}
