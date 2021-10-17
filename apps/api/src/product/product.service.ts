import { Injectable } from '@nestjs/common';
import AuthWrapper from '../auth/auth.wrapper';
import { ProductsNotFound } from '../common/errors';
import DBService from '../db/db.service';
import {
  ProductLogModel,
  ProductModel,
  ProductStockModel,
} from './product.dto';

@Injectable()
export default class ProductService {
  constructor(private db: DBService) {}

  async addProducts(
    auth: AuthWrapper,
    products: { id: string; name?: string; price?: number }[]
  ): Promise<number> {
    const result = await this.db.$transaction([
      ...products.map(({ id, name, price }) =>
        this.db.product.upsert({
          create: { id, name, price },
          update: { name, price },
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
    const rawResult = await this.db.$queryRaw<
      {
        id: string;
        name: string;
        price: number;
        stock: number;
        total: number;
        created_at: string;
        updated_at: string;
        stock_updated_at: string;
      }[]
    >`
      select
        product.id,
        product.name,
        product.price,
        coalesce(stock.stock, 0) as stock,
        coalesce((select sum(stock) from stock where product_id = product.id), 0) as total,
        product.created_at,
        product.updated_at,
        stock.updated_at as stock_updated_at
      from product left join (
        select product_id, stock, updated_at from stock where stock.warehouse_id = ${warehouseId}
      ) as stock on stock.product_id = product.id order by coalesce(stock.stock, 0) desc limit ${limit} offset ${offset};
    `;
    return Promise.all(
      rawResult.map(
        async ({
          id,
          name,
          price,
          stock,
          total,
          created_at,
          updated_at,
          stock_updated_at,
        }) => {
          const createdAt = new Date(created_at);
          const updatedAt = new Date(updated_at);
          const stockUpdateAt = stock_updated_at
            ? new Date(stock_updated_at)
            : new Date();
          if (total === 0) {
            return new ProductModel(id, name, price, createdAt, updatedAt, {
              amount: stock,
              all: total,
              topWarehouse: '',
              topAmount: 0,
              updatedAt: stockUpdateAt,
            });
          }
          const max = await this.db.stock.findFirst({
            where: { product_id: id },
            orderBy: { stock: 'desc' },
          });
          return new ProductModel(id, name, price, createdAt, updatedAt, {
            amount: stock,
            all: total,
            topWarehouse: max.warehouse_id,
            topAmount: max.stock,
            updatedAt: stockUpdateAt,
          });
        }
      )
    );
  }

  async searchProduct(
    query: string,
    limit: number,
    offset: number
  ): Promise<{ id: string; name: string }[]> {
    const data = await this.db.product.findMany({
      skip: offset * limit,
      take: limit,
      where: {
        OR: [
          { id: { contains: query, mode: 'insensitive' } },
          { name: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
    return data.map(({ id, name }) => ({ id, name }));
  }

  async getProductStock(id: string): Promise<ProductStockModel> {
    const product = await this.db.product.findUnique({
      where: { id },
      include: { stock: true },
    });
    if (!product) throw new ProductsNotFound([id]);
    return ProductStockModel.fromDB(product);
  }
}
