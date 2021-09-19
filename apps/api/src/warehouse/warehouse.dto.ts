import { warehouse } from '.prisma/client';
import { Warehouse } from '../graphql';

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
        return undefined;
    }
  }
}
