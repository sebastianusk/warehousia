import { Prisma } from '@prisma/client';
import { Inbound } from '../graphql';

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

const inboundWithItems = Prisma.validator<Prisma.inboundArgs>()({
  include: { inbound_item: true },
});

export type InboundWithItem = Prisma.inboundGetPayload<typeof inboundWithItems>;
