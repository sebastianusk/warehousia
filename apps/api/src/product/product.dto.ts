/* eslint-disable max-classes-per-file */
import { Prisma } from '@prisma/client';
import { Product, ProductLog, ProductStock } from '../graphql';

export class ProductModel {
  constructor(
    public id: string,
    public name: string,
    public price: number,
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
      data.product.price,
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
      price: this.price,
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
      log.id,
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

export class ProductStockModel {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public createdAt: Date,
    public updatedAt: Date,
    public stock: { warehouseId: string; amount: number }[]
  ) {}

  static fromDB(data: ProductStockDB): ProductStockModel {
    return new ProductStockModel(
      data.id,
      data.name,
      data.price,
      data.created_at,
      data.updated_at,
      data.stock
        .map((item) => ({
          warehouseId: item.warehouse_id,
          amount: item.stock,
        }))
        .sort((a, b) => b.amount - a.amount)
    );
  }

  toResponse(): ProductStock {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      updatedAt: this.updatedAt.toISOString(),
      createdAt: this.createdAt.toISOString(),
      stocks: this.stock,
    };
  }
}

const productStock = Prisma.validator<Prisma.productArgs>()({
  include: { stock: true },
});

export type ProductStockDB = Prisma.productGetPayload<typeof productStock>;
