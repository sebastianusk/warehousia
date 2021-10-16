import { Injectable } from '@nestjs/common';
import AuthWrapper from '../auth/auth.wrapper';
import DBService from '../db/db.service';
import { ProductLogModel, ProductModel } from './product.dto';

@Injectable()
export default class ProductService {
  constructor(private db: DBService) {}

  async addProducts(
    auth: AuthWrapper,
    products: { id: string; name: string }[]
  ): Promise<number> {
    const result = await this.db.$transaction([
      ...products.map(({ id, name }) =>
        this.db.product.upsert({
          create: { id, name },
          update: { name },
          where: { id },
        })
      ),
      auth.log(this.db, 'createProducts', {
        ids: products.map((item) => item.id),
      }),
    ]);
    return result.length - 1;
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

  async editStockProduct(
    auth: AuthWrapper,
    id: string,
    warehouse: string,
    amount: number
  ): Promise<string> {
    const log = {
      amount,
      created_by: auth.username,
      action: 'adminUpdate',
      remarks: {
        notes: 'super admin edit',
      },
    };
    const result = await this.db.$transaction([
      this.db.stock.upsert({
        update: {
          stock: amount,
          logs: {
            create: log,
          },
        },
        create: {
          warehouse_id: warehouse,
          product_id: id,
          stock: amount,
          logs: {
            create: log,
          },
        },
        where: {
          product_id_warehouse_id: { product_id: id, warehouse_id: warehouse },
        },
      }),
      auth.log(this.db, 'editStock', { id, warehouse, amount }),
    ]);
    return result[0].product_id;
  }

  async getProductLog(
    id: string,
    limit: number,
    offset: number
  ): Promise<ProductLogModel[]> {
    const data = await this.db.stocklog.findMany({
      skip: offset * limit,
      take: limit,
      where: { stock: { product_id: id } },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        stock: true,
      },
    });
    return data.map((item) => ProductLogModel.fromDB(item));
  }

  async getProducts(
    query: string,
    warehouseId: string,
    limit: number,
    offset: number
  ): Promise<ProductModel[]> {
    const data = await this.db.stock.findMany({
      skip: limit * offset,
      take: limit,
      where: {
        product_id: { contains: query },
        warehouse_id: { equals: warehouseId },
      },
      include: {
        product: true,
      },
    });
    return Promise.all(
      data.map(async (item) => {
        const aggr = await this.db.stock.aggregate({
          _max: { stock: true },
          _sum: { stock: true },
          where: { product_id: item.product_id },
        });
        const topWarehouse = await this.db.stock.findFirst({
          where: {
            product_id: item.product_id,
            // eslint-disable-next-line no-underscore-dangle
            stock: aggr._max.stock,
          },
        });
        return new ProductModel(
          item.product_id,
          item.product.name,
          item.product.created_at,
          item.product.updated_at,
          {
            amount: item.stock,
            // eslint-disable-next-line no-underscore-dangle
            all: aggr._sum.stock,
            // eslint-disable-next-line no-underscore-dangle
            topAmount: aggr._max.stock,
            topWarehouse: topWarehouse.warehouse_id,
            updatedAt: item.updated_at,
          }
        );
      })
    );
  }
}
