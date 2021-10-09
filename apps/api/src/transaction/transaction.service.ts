import { Injectable } from '@nestjs/common';
import AuthWrapper from '../auth/auth.wrapper';
import { ProductsNotFound } from '../common/errors';
import DBService from '../db/db.service';
import {
  DemandModel,
  OutboundModel,
  PreparationModel,
} from './transaction.dto';

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

    await this.db.$transaction(
      wrapper.outbound.map(({ productId, amount }) =>
        this.db.stock.update({
          where: {
            product_id_warehouse_id: {
              product_id: productId,
              warehouse_id: warehouseId,
            },
          },
          data: {
            stock: { decrement: amount },
          },
        })
      )
    );

    const outbounds = await this.db.$transaction(
      wrapper.outbound.map(({ amount, productId }) =>
        this.db.outbound_item.create({
          data: {
            product_id: productId,
            amount,
            warehouse_id: warehouseId,
            shop_id: shopId,
            created_by: auth.username,
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
            created_by: auth.username,
          },
        })
      )
    );

    return {
      demands: demands.map((item) => item.id),
      outbounds: outbounds.map((item) => item.id),
    };
  }

  async getDemands(
    warehouseId: string,
    shopId: string,
    limit: number = 10,
    offset: number = 0
  ): Promise<DemandModel[]> {
    const demands = await this.db.demand.findMany({
      skip: offset * limit,
      take: limit,
      where: {
        warehouse_id: warehouseId,
        shop_id: shopId,
        fulfiled_at: null,
      },
      orderBy: { created_at: 'desc' },
    });
    return demands.map((data) => DemandModel.fromDB(data));
  }

  async getOutbounds(
    warehouseId: string,
    shopId: string,
    offset: number = 0,
    limit: number = 10
  ): Promise<OutboundModel[]> {
    const outbounds = await this.db.outbound_item.findMany({
      skip: offset * limit,
      take: limit,
      where: {
        warehouse_id: warehouseId,
        shop_id: shopId,
        preparation_id: null,
      },
      orderBy: { created_at: 'desc' },
    });
    return outbounds.map((data) => OutboundModel.fromDB(data));
  }

  async createPreparation(
    auth: AuthWrapper,
    warehouseId: string,
    shopId: string
  ): Promise<string> {
    const { id } = await this.db.preparation.create({
      data: {
        created_by: auth.username,
        warehouse_id: warehouseId,
        shop_id: shopId,
      },
    });
    await this.db.outbound_item.updateMany({
      where: {
        warehouse_id: warehouseId,
        shop_id: shopId,
        preparation_id: null,
      },
      data: { preparation_id: id },
    });
    return id;
  }

  async getPreparation(
    id: string,
    warehouseId: string,
    shopId: string
  ): Promise<PreparationModel[]> {
    const data = await this.db.preparation.findMany({
      where: {
        OR: [
          { id: { contains: id } },
          { warehouse_id: warehouseId, shop_id: shopId },
        ],
      },
      include: { outbound: { include: { missing: true } } },
    });
    return data.map(
      (preparation) =>
        new PreparationModel(
          preparation.id,
          preparation.warehouse_id,
          preparation.shop_id,
          preparation.created_by,
          preparation.created_at,
          preparation.outbound.map((item) => ({
            productId: item.product_id,
            expected: item.amount,
            actual: item.missing
              ? item.amount -
                item.missing.reduce(
                  (total, missingItem) => total + missingItem.missing,
                  0
                )
              : item.amount,
          }))
        )
    );
  }
}
