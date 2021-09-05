import { warehouse } from '.prisma/client';
import { Warehouse } from '../graphql';

export enum Feature {
  INBOUND = 'INBOUND',
  TRANSFER = 'TRANSFER',
  OUTBOUND = 'OUTBOUND',
}

export default class WarehouseModel {
  constructor(
    public name: string,
    public active: boolean,
    public features: Feature[],
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  static fromDB(data: warehouse): WarehouseModel {
    return new WarehouseModel(
      data.name,
      data.active,
      data.features.map((item) => WarehouseModel.fromFeatureString(item)),
      data.createdAt,
      data.updatedAt
    );
  }

  toResponse(): Warehouse {
    return {
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
