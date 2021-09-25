/* eslint-disable max-classes-per-file */
import { Prisma } from '@prisma/client';
import { ProductLog } from '../graphql';

export class ProductModel {}

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
