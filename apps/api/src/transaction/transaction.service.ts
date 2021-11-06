import { Injectable } from '@nestjs/common';
import AuthWrapper from '../auth/auth.wrapper';
import {
  FieldEmpty,
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
    if (items.length === 0) {
      throw new FieldEmpty('items');
    }

    const products = await Promise.all(
      items.map(async ({ productId, amount }) => {
        const product = await this.db.product.findUnique({
          where: { id: productId },
        });
        return { productId, amount, notFound: !product };
      })
    );

    const notFound = products.filter((item) => item.notFound);

    if (notFound.length !== 0) {
      throw new ProductsNotFound(notFound.map((item) => item.productId));
    }

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
          await this.db.stock.create({
            data: {
              warehouse_id: warehouseId,
              product_id: productId,
              stock: 0,
            },
          });
          return { productId, stock: 0, amount };
        }
        return { productId, stock: stock.stock, amount };
      })
    );

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
            remarks: {
              source: 'outbound',
            },
          },
        })
      )
    );

    await auth.log(this.db, 'createOutbound', {
      warehouseId,
      shopId,
      items,
      demands: demands.map(({ product_id, shop_id, amount }) => ({
        productId: product_id,
        shopId: shop_id,
        amount,
      })),
      outbounds: outbounds.map(({ product_id, shop_id, amount }) => ({
        productId: product_id,
        shopId: shop_id,
        amount,
      })),
    });

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
      skip: offset,
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
    shopId: string
  ): Promise<OutboundModel[]> {
    const outbounds = await this.db.outbound_item.findMany({
      where: {
        warehouse_id: warehouseId,
        shop_id: shopId,
        preparation_id: null,
      },
      orderBy: { created_at: 'desc' },
    });
    return outbounds.map((data) => OutboundModel.fromDB(data));
  }

  static generatePreparationId(warehouseId: string): string {
    const pad = (x: number) => `0${x}`.slice(-2);
    const date = new Date();
    const code = warehouseId.substring(0, 3).toUpperCase();
    const year = date.getFullYear() % 100;
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());
    const id = `${code}-${year}${month}${day}-${hour}${minute}${second}`;
    return id;
  }

  async createPreparation(
    auth: AuthWrapper,
    warehouseId: string,
    shopId: string[]
  ): Promise<string> {
    if (shopId.length === 0) {
      throw new FieldEmpty('shopId');
    }
    if (shopId.length === 0) throw new FieldEmpty('shopId');
    const preparationId = TransactionService.generatePreparationId(warehouseId);
    const { id } = await this.db.preparation.create({
      data: {
        id: preparationId,
        created_by: auth.username,
        warehouse_id: warehouseId,
      },
    });
    await this.db.outbound_item.updateMany({
      where: {
        warehouse_id: warehouseId,
        shop_id: { in: shopId },
        preparation_id: null,
      },
      data: { preparation_id: id },
    });
    await auth.log(this.db, 'createPreparation', {
      warehouseId,
      shopId,
      preparation: id,
    });
    return id;
  }

  async getPreparations(
    id: string,
    warehouseId: string = ''
  ): Promise<PreparationModel[]> {
    const data = await this.db.preparation.findMany({
      where: {
        AND: [
          {
            OR: [{ id: { contains: id } }, { warehouse_id: warehouseId }],
          },
          {
            transaction_id: null,
          },
        ],
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
  ): Promise<
    {
      id: string;
      shopId: string;
      warehouseId: string;
      createdAt: Date;
      createdBy: string;
      items: { id: string; productId: string; amount: number }[];
      failed: { id: string; productId: string; amount: number }[];
    }[]
  > {
    const preparation = await this.db.preparation.findUnique({
      where: { id: preparationId },
      include: {
        missing: true,
        outbound: { orderBy: { created_at: 'desc' } },
      },
    });
    if (!preparation) {
      throw new PreparationNotFound(preparationId);
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { warehouse_id, missing, outbound } = preparation;

    const notFounds = missing.reduce((prev, notFoundItem) => {
      const next = prev;
      if (!next[notFoundItem.product_id]) {
        next[notFoundItem.product_id] = notFoundItem.missing;
      } else {
        next[notFoundItem.product_id] += notFoundItem.missing;
      }
      return next;
    }, {} as { [key: string]: number });

    const perShop = outbound.reduce<{
      [key: string]: {
        items: { productId: string; amount: number }[];
        failed: { productId: string; amount: number }[];
      };
    }>((prev, item) => {
      const next = { ...prev };
      const shopId = item.shop_id;
      if (!next[shopId]) {
        next[shopId] = { items: [], failed: [] };
      }
      const productId = item.product_id;
      const notFoundAmount = notFounds[productId];
      if (notFoundAmount) {
        if (!next[shopId].failed[shopId]) {
          next[shopId].failed[shopId] = [];
        }
        if (notFoundAmount < item.amount) {
          next[shopId].items.push({
            productId: item.product_id,
            amount: item.amount - notFoundAmount,
          });
          next[shopId].failed.push({
            productId: item.product_id,
            amount: notFoundAmount,
          });
          notFounds[productId] = undefined;
        } else {
          next[shopId].failed.push({
            productId: item.product_id,
            amount: item.amount,
          });
          notFounds[productId] = notFoundAmount - item.amount;
        }
      } else {
        next[shopId].items.push({
          productId: item.product_id,
          amount: item.amount,
        });
      }
      return next;
    }, {});
    const data = await Promise.all(
      Object.entries(perShop).map(async (transaction) => {
        const shopId = transaction[0];
        const { items, failed } = transaction[1];
        return this.db.transaction.create({
          data: {
            preparation: { connect: { id: preparationId } },
            created_by: auth.username,
            shop_id: shopId,
            warehouse_id,
            remarks,
            items: {
              createMany: {
                data: items.map(({ productId, amount }) => ({
                  product_id: productId,
                  amount,
                })),
              },
            },
            failed: {
              createMany: {
                data: failed.map(({ productId, amount }) => ({
                  product_id: productId,
                  amount,
                })),
              },
            },
          },
          include: { items: true, failed: true },
        });
      })
    );

    await auth.log(this.db, 'createTransaction', {
      preparationId,
      transactions: data.map(({ id }) => id),
    });

    return data.map(
      ({ id, shop_id, created_at, created_by, items, failed }) => ({
        id,
        shopId: shop_id,
        warehouseId: warehouse_id,
        createdAt: created_at,
        createdBy: created_by,
        items: items.map((item) => ({
          productId: item.product_id,
          amount: item.amount,
          id: item.id,
        })),
        failed: failed.map((item) => ({
          productId: item.product_id,
          amount: item.amount,
          id: item.id,
        })),
      })
    );
  }

  async getTransactions(
    query: string,
    warehouseId: string,
    shopId: string,
    offset: number = 0,
    limit: number = 10
  ): Promise<TransactionModel[]> {
    const transactions = await this.db.transaction.findMany({
      take: limit,
      skip: offset * limit,
      where: {
        OR: [
          {
            warehouse_id: warehouseId,
            shop_id: shopId,
          },
          { id: { contains: query } },
        ],
      },
      include: { items: true, failed: true },
    });
    return transactions.map(
      ({ id, shop_id, warehouse_id, created_at, created_by, items, failed }) =>
        new TransactionModel(
          id,
          shop_id,
          warehouse_id,
          created_at,
          created_by,
          items.map((item) => ({
            id: item.id,
            amount: item.amount,
            productId: item.product_id,
          })),
          failed.map((item) => ({
            id: item.id,
            amount: item.amount,
            productId: item.product_id,
          }))
        )
    );
  }
}
