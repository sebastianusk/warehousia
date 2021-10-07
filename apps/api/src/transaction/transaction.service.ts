import { Injectable } from '@nestjs/common';
import AuthWrapper from '../auth/auth.wrapper';
import { ProductsNotFound } from '../common/errors';
import DBService from '../db/db.service';

@Injectable()
export default class TransactionService {
  constructor(private db: DBService) {}

  async createOutbound(
    auth: AuthWrapper,
    warehouseId: string,
    shopId: string,
    items: { productId: string; amount: number }[]
  ): Promise<{ demands: string[]; outbounds: string[] }> {
    const stocks = await Promise.all(
      items.map(async ({ productId, amount }) => {
        const stock = await this.db.stock.findUnique({
          where: {
            product_id_warehouse_id: {
              product_id: productId,
              warehouse_id: warehouseId,
            },
          },
        });
        if (!stock) {
          return { productId, stock: undefined, amount };
        }
        return { productId, stock: stock.stock, amount };
      })
    );

    const error = stocks
      .filter((item) => !item.stock)
      .map((item) => item.productId);

    if (error.length !== 0) {
      throw new ProductsNotFound(error);
    }

    const outboundLog = await this.db.outbound.create({
      data: { created_by: auth.username },
    });

    const data = stocks.map((stock) => {
      if (stock.stock > stock.amount) {
        return {
          productId: stock.productId,
          outbound: stock.amount,
          demand: 0,
        };
      }
      return {
        productId: stock.productId,
        outbound: stock.stock,
        demand: stock.amount - stock.stock,
      };
    });

    const wrapper = data.reduce(
      (formatter, { productId, outbound, demand }) => {
        if (outbound !== 0)
          formatter.outbound.push({ productId, amount: outbound });
        if (demand !== 0) formatter.demand.push({ productId, amount: demand });
        return formatter;
      },
      {
        demand: [] as { productId: string; amount: number }[],
        outbound: [] as { productId: string; amount: number }[],
      }
    );

    const outbounds = await this.db.$transaction(
      wrapper.outbound.map(({ amount, productId }) =>
        this.db.outbound_item.create({
          data: {
            product_id: productId,
            amount,
            warehouse_id: warehouseId,
            shop_id: shopId,
            outbound: { connect: { id: outboundLog.id } },
          },
        })
      )
    );

    const demands = await this.db.$transaction(
      wrapper.demand.map(({ productId, amount }) =>
        this.db.demand.create({
          data: {
            product_id: productId,
            amount,
            warehouse_id: warehouseId,
            shop_id: shopId,
            outbound: { connect: { id: outboundLog.id } },
          },
        })
      )
    );

    return {
      demands: demands.map((item) => item.id),
      outbounds: outbounds.map((item) => item.id),
    };
  }
}
