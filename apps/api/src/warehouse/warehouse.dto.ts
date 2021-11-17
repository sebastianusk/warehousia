/* eslint-disable max-classes-per-file */
import { demand, warehouse } from '@prisma/client';
import { EnumNotValid } from '../common/errors';
import { Demand, Warehouse } from '../graphql';

export enum Feature {
  INBOUND = 'INBOUND',
  TRANSFER = 'TRANSFER',
  OUTBOUND = 'OUTBOUND',
}

export default class WarehouseModel {
  constructor(
    public id: string,
    public name: string,
    public active: boolean,
    public features: Feature[],
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  static fromDB(data: warehouse): WarehouseModel {
    return new WarehouseModel(
      data.id,
      data.name,
      data.active,
      data.features.map((item) => WarehouseModel.fromFeatureString(item)),
      data.created_at,
      data.updated_at
    );
  }

  toResponse(): Warehouse {
    return {
      id: this.id,
      name: this.name,
      active: this.active,
      features: this.features.map((item) => item.toString()),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  static fromFeatureString(feature: string) {
    switch (feature) {
      case 'INBOUND':
        return Feature.INBOUND;
      case 'OUTBOUND':
        return Feature.OUTBOUND;
      case 'TRANSFER':
        return Feature.TRANSFER;
      default:
        throw new EnumNotValid('feature', feature);
    }
  }
}

export class DemandModel {
  constructor(
    public id: string,
    public warehouseId: string,
    public shopId: string,
    public productId: string,
    public amount: number,
    public createdAt: Date,
    public createdBy: string,
    public expiredAt: Date
  ) {}

  static fromDB(data: demand): DemandModel {
    return new DemandModel(
      data.id,
      data.warehouse_id,
      data.shop_id,
      data.product_id,
      data.amount,
      data.created_at,
      data.created_by,
      data.expired_at
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
      expiredAt: this.expiredAt?.toISOString() || '',
    };
  }
}
