// eslint-disable-next-line max-classes-per-file
import { demand, outbound_item } from '@prisma/client';
import { Demand, Outbound } from '../graphql';

export class DemandModel {
  constructor(
    public id: string,
    public warehouseId: string,
    public shopId: string,
    public productId: string,
    public amount: number,
    public createdAt: Date,
    public createdBy: string
  ) {}

  static fromDB(data: demand): DemandModel {
    return new DemandModel(
      data.id,
      data.warehouse_id,
      data.shop_id,
      data.product_id,
      data.amount,
      data.created_at,
      data.created_by
    );
  }

  toResponse(): Demand {
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
