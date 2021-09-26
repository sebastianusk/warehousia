/* eslint-disable max-classes-per-file */
import { Prisma } from '@prisma/client';
import { Inbound, Transfer } from '../graphql';

export class InboundModel {
  constructor(
    public id: string,
    public warehouse: string,
    public createdBy: string,
    public createdAt: Date,
    public items: { id: string; product: string; amount: number }[]
  ) {}

  static fromDB(data: InboundWithItem): InboundModel {
    return new InboundModel(
      data.id,
      data.warehouse,
      data.created_by,
      data.created_at,
      data.inbound_item.map((item) => ({
        id: item.id,
        product: item.product_id,
        amount: item.amount,
      }))
    );
  }

  toResponse(): Inbound {
    return {
      id: this.id,
      warehouse: this.warehouse,
      createdBy: this.createdBy,
      createdAt: this.createdAt.toISOString(),
      items: this.items.map((item) => ({ ...item })),
    };
  }
}

export class TransferModel {
  constructor(
    public id: string,
    public warehouseId: string,
    public destinationId: string,
    public createdAt: Date,
    public createdBy: string,
    public items: { id: string; productId: string; amount: number }[]
  ) {}

  static fromDB(data: TransferWithItem): TransferModel {
    return new TransferModel(
      data.id,
      data.warehouse,
      data.destination,
      data.created_at,
      data.created_by,
      data.transfer_item.map((item) => ({
        id: item.id,
        productId: item.productId,
        amount: item.amount,
      }))
    );
  }

  toResponse(): Transfer {
    return {
      id: this.id,
      source: this.warehouseId,
      destination: this.destinationId,
      createdBy: this.createdBy,
      createdAt: this.createdAt.toISOString(),
      items: this.items.map((item) => ({
        id: item.id,
        amount: item.amount,
        product: item.productId,
      })),
    };
  }
}

const inboundWithItems = Prisma.validator<Prisma.inboundArgs>()({
  include: { inbound_item: true },
});

export type InboundWithItem = Prisma.inboundGetPayload<typeof inboundWithItems>;

const transferWithItem = Prisma.validator<Prisma.transferArgs>()({
  include: { transfer_item: true },
});

export type TransferWithItem = Prisma.transferGetPayload<
  typeof transferWithItem
>;
