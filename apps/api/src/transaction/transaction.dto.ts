// eslint-disable-next-line max-classes-per-file
import { outbound_item } from '@prisma/client';
import { Outbound, Preparation, Transaction } from '../graphql';

export class OutboundModel {
  constructor(
    public id: string,
    public warehouseId: string,
    public shopId: string,
    public productId: string,
    public amount: number,
    public createdAt: Date,
    public createdBy: string
  ) {}

  static fromDB(data: outbound_item): OutboundModel {
    return new OutboundModel(
      data.id,
      data.warehouse_id,
      data.shop_id,
      data.product_id,
      data.amount,
      data.created_at,
      data.created_by
    );
  }

  toResponse(): Outbound {
    return {
      id: this.id,
      warehouseId: this.warehouseId,
      shopId: this.shopId,
      productId: this.productId,
      amount: this.amount,
      createdAt: this.createdAt.toISOString(),
      createdBy: this.createdBy,
    };
  }
}

export class PreparationModel {
  constructor(
    public id: string,
    public warehouseId: string,
    public createdBy: string,
    public createdAt: Date,
    public items: {
      productId: string;
      expected: number;
      actual: number;
    }[]
  ) {}

  toResponse(): Preparation {
    return {
      id: this.id,
      warehouseId: this.warehouseId,
      items: this.items,
      createdAt: this.createdAt.toISOString(),
      createdBy: this.createdBy,
    };
  }
}

export class TransactionModel {
  constructor(
    public id: string,
    public shopId: string,
    public warehouseId: string,
    public createdAt: Date,
    public createdBy: string,
    public items: { id: string; productId: string; amount: number }[],
    public failed: { id: string; productId: string; amount: number }[]
  ) {}

  toResponse(): Transaction {
    return {
      id: this.id,
      shopId: this.shopId,
      warehouseId: this.warehouseId,
      createdAt: this.createdAt.toISOString(),
      createdBy: this.createdBy,
      items: this.items,
      failed: this.failed,
    };
  }
}
