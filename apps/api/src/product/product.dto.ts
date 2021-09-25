/* eslint-disable max-classes-per-file */
import { Prisma } from '@prisma/client';
import { Product, ProductLog } from '../graphql';

export class ProductModel {
  constructor(
    public id: string,
    public name: string,
    public createdAt: Date,
    public updatedAt: Date,
    public stock: {
      amount: number;
      all: number;
      topWarehouse: string;
      topAmount: number;
      updatedAt: Date;
    }
  ) {}

  static fromDB(data: ProductDB): ProductModel {
    return new ProductModel(
      data.product.id,
      data.product.name,
      data.product.created_at,
      data.product.updated_at,
      {
        amount: data.stock,
        updatedAt: data.updated_at,
        topAmount: 0,
        topWarehouse: '',
        all: 0,
      }
    );
  }

  toResponse(): Product {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      stock: {
        amount: this.stock.amount,
        all: this.stock.all,
        topAmount: this.stock.topAmount,
        topWarehouse: this.stock.topWarehouse,
        updatedAt: this.stock.updatedAt.toISOString(),
      },
    };
  }
}

export class ProductLogModel {
  constructor(
    public id: string,
    public warehouse: string,
    public amount: number,
    public action: string,
    public remarks: any,
    public createdBy: string,
    public createdAt: Date
  ) {}

  static fromDB(log: ProductLogDB): ProductLogModel {
    return new ProductLogModel(
      log.stock.product_id,
      log.stock.warehouse_id,
      log.amount,
      log.action,
      log.remarks,
      log.created_by,
      log.created_at
    );
  }

  toResponse(): ProductLog {
    return {
      amount: this.amount,
      warehouse: this.warehouse,
      id: this.id,
      action: this.action,
      createdAt: this.createdAt.toISOString(),
      createdBy: this.createdBy,
      remarks: JSON.stringify(this.remarks),
    };
  }
}

const productLog = Prisma.validator<Prisma.stocklogArgs>()({
  include: { stock: true },
});

export type ProductLogDB = Prisma.stocklogGetPayload<typeof productLog>;

const product = Prisma.validator<Prisma.stockArgs>()({
  include: { product: true },
});

export type ProductDB = Prisma.stockGetPayload<typeof product>;
