import { Injectable } from '@nestjs/common';
import AuthWrapper from '../auth/auth.wrapper';
import DBService from '../db/db.service';

@Injectable()
export default class ProductService {
  constructor(private db: DBService) {}

  async addProducts(
    auth: AuthWrapper,
    products: { id: string; name: string }[]
  ): Promise<number> {
    const result = await this.db.$transaction([
      this.db.product.createMany({ data: products, skipDuplicates: true }),
      auth.log(this.db, 'createProducts', {
        ids: products.map((item) => item.id),
      }),
    ]);
    return result[0].count;
  }

  async editProduct(
    auth: AuthWrapper,
    id: string,
    name: string
  ): Promise<string> {
    const result = await this.db.$transaction([
      this.db.product.update({
        data: { name },
        where: { id },
      }),
      auth.log(this.db, 'editProduct', { id }),
    ]);
    return result[0].id;
  }
}
