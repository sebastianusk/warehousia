import { Injectable } from '@nestjs/common';
import AuthWrapper from '../auth/auth.wrapper';
import {
  PreparationNotFound,
  ProductsNotFound,
  WrongMissingAmount,
} from '../common/errors';
import DBService from '../db/db.service';
import {
  DemandModel,
  OutboundModel,
  PreparationModel,
  TransactionModel,
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
    await auth.log(this.db, 'createOutbound', { warehouseId, shopId, items });
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
            logs: {
              create: { amount, created_by: auth.username, action: 'outbound' },
            },
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
    await auth.log(this.db, 'createPreparation', { warehouseId, shopId });
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

  async getPreparations(
    id: string,
    warehouseId: string = '',
    shopId: string = ''
  ): Promise<PreparationModel[]> {
    const data = await this.db.preparation.findMany({
      where: {
        OR: [
          { id: { contains: id } },
          { warehouse_id: warehouseId, shop_id: shopId },
        ],
        transaction: undefined,
      },
      include: { outbound: true, missing: true },
    });
    return data.map((preparation) => {
      const products = preparation.outbound.reduce((prev, item) => {
        const next = prev;
        if (next[item.product_id]) {
          next[item.product_id] += item.amount;
        } else {
          next[item.product_id] = item.amount;
        }
        return next;
      }, {} as { [key: string]: number });
      const amount = Object.entries(products).map((product) => {
        const missing = preparation.missing
          .filter((missings) => missings.product_id === product[0])
          .reduce((total, item) => total + item.missing, 0);
        return {
          productId: product[0],
          expected: product[1],
          actual: product[1] - missing,
        };
      });
      return new PreparationModel(
        preparation.id,
        preparation.warehouse_id,
        preparation.shop_id,
        preparation.created_by,
        preparation.created_at,
        amount
      );
    });
  }

  async getPreparation(id: string): Promise<PreparationModel> {
    const preparations = await this.getPreparations(id);
    if (preparations.length !== 1) throw new PreparationNotFound(id);
    return preparations[0];
  }

  async createMissing(
    auth: AuthWrapper,
    preparationId: string,
    productId: string,
    amount: number
  ): Promise<string> {
    await auth.log(this.db, 'createMissing', {
      preparationId,
      productId,
      amount,
    });
    const preparation = await this.getPreparation(preparationId);
    const item = preparation.items.find((data) => data.productId === productId);
    if (!item) throw new ProductsNotFound([productId]);
    if (item.actual - amount < 0)
      throw new WrongMissingAmount(
        productId,
        item.expected,
        item.expected - item.actual + amount
      );
    const missing = await this.db.missing.create({
      data: {
        product_id: productId,
        missing: amount,
        created_by: auth.username,
        preparation: { connect: { id: preparation.id } },
      },
    });
    return missing.id;
  }

  async createTransaction(
    auth: AuthWrapper,
    preparationId: string,
    remarks: string
  ): Promise<string> {
    await auth.log(this.db, 'createTransaction', { preparationId });
    const { shopId, warehouseId, items } = await this.getPreparation(
      preparationId
    );
    const data = await this.db.transaction.create({
      data: {
        preparation: { connect: { id: preparationId } },
        created_by: auth.username,
        shop_id: shopId,
        warehouse_id: warehouseId,
        remarks,
        items: {
          createMany: {
            data: items.map((item) => ({
              product_id: item.productId,
              amount: item.actual,
            })),
          },
        },
      },
    });
    return data.id;
  }

  async getTransactions(
    productId: string,
    warehouseId: string,
    shopId: string,
    offset: number = 0,
    limit: number = 10
  ): Promise<TransactionModel[]> {
    const transactions = await this.db.transaction_item.findMany({
      take: limit,
      skip: offset * limit,
      where: {
        product_id: productId,
        transaction: { warehouse_id: warehouseId, shop_id: shopId },
      },
      include: { transaction: true },
    });
    return transactions.map(
      (item) =>
        new TransactionModel(
          item.id,
          item.transaction.shop_id,
          item.transaction.warehouse_id,
          item.product_id,
          item.amount,
          item.transaction.created_at,
          item.transaction.created_by
        )
    );
  }
}
