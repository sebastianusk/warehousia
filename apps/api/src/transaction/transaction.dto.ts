// eslint-disable-next-line max-classes-per-file
import { outbound_item, Prisma } from '@prisma/client';
import { Outbound, Preparation, TransactionResponse } from '../graphql';

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
    public shops: string[],
    public warehouseId: string,
    public createdAt: Date,
    public createdBy: string,
    public items: { id: string; productId: string; amount: number }[],
    public failed: { id: string; productId: string; amount: number }[]
  ) {}

  static fromDB(data: TransactionItemDB): TransactionModel {
    const shops = [
      ...new Set(
        data.items
          .map(({ shop_id }) => shop_id)
          .concat(data.failed.map(({ shop_id }) => shop_id))
      ),
    ];
    return new TransactionModel(
      data.id,
      shops,
      data.warehouse_id,
      data.created_at,
      data.created_by,
      data.items.map(({ id, product_id, amount }) => ({
        id,
        productId: product_id,
        amount,
      })),
      data.failed.map(({ id, product_id, amount }) => ({
        id,
        productId: product_id,
        amount,
      }))
    );
  }

  toResponse(): TransactionResponse {
    return {
      id: this.id,
      shops: this.shops,
      warehouseId: this.warehouseId,
      createdAt: this.createdAt.toISOString(),
      createdBy: this.createdBy,
      items: this.items,
      failed: this.failed,
    };
  }
}

const transactionItems = Prisma.validator<Prisma.transactionArgs>()({
  include: { items: true, failed: true },
});

export type TransactionItemDB = Prisma.transactionGetPayload<
  typeof transactionItems
>;
