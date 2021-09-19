import { shop } from '@prisma/client';
import { Shop } from '../graphql';

export default class ShopModel {
  constructor(
    public id: string,
    public name: string,
    public active: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  static fromDb(data: shop): ShopModel {
    return new ShopModel(
      data.id,
      data.name,
      data.active,
      data.created_at,
      data.updated_at
    );
  }

  toResponse(): Shop {
    return {
      id: this.id,
      name: this.name,
      active: this.active,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
