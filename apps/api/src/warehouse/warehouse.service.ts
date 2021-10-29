import { Injectable } from '@nestjs/common';
import AuthWrapper from '../auth/auth.wrapper';
import { FieldEmpty, NotEnoughItems } from '../common/errors';
import DBService from '../db/db.service';
import { InboundModel, TransferModel } from './stock.dto';
import WarehouseModel, { Feature } from './warehouse.dto';

@Injectable()
export default class WarehouseService {
  constructor(private db: DBService) {}

  async createWarehouse(
    auth: AuthWrapper,
    id: string,
    name: string,
    features: Feature[]
  ): Promise<string> {
    const result = await this.db.$transaction([
      this.db.warehouse.create({
        data: {
          id,
          name,
          features: features
            .filter((item) => item)
            .map((item) => item.toString()),
        },
      }),
      auth.log(this.db, 'createWarehouse', { id }),
    ]);
    return result[0].id;
  }

  async getList(
    query: string,
    limit: number,
    offset: number
  ): Promise<WarehouseModel[]> {
    const data = await this.db.warehouse.findMany({
      skip: offset,
      take: limit,
      where: query
        ? {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { id: { contains: query, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { id: 'asc' },
    });
    return data.map((item) => WarehouseModel.fromDB(item));
  }

  async editWarehouse(
    auth: AuthWrapper,
    id: string,
    name: string,
    features: Feature[],
    active: boolean
  ): Promise<string> {
    const result = await this.db.$transaction([
      this.db.warehouse.update({
        where: { id },
        data: { name, features, active },
      }),
      auth.log(
        this.db,
        'updateWarehouse',
        AuthWrapper.structRemarks(id, { name, features, active })
      ),
    ]);
    return result[0].id;
  }

  async getWarehouse(id: string): Promise<WarehouseModel> {
    const data = await this.db.warehouse.findFirst({ where: { id } });
    return WarehouseModel.fromDB(data);
  }

  async addInbound(
    auth: AuthWrapper,
    id: string,
    items: { productid: string; amount: number }[]
  ): Promise<string> {
    if (items.length === 0) throw new FieldEmpty('items');
    await auth.log(this.db, 'inbound', { id });
    const inbound = await this.db.inbound.create({
      data: {
        warehouse: id,
        created_by: auth.username,
        inbound_item: {
          create: items.map((item) => ({
            amount: item.amount,
            product_id: item.productid,
          })),
        },
      },
    });
    const stocks = await Promise.all(
      items.map(async (item) =>
        this.db.stock.upsert({
          create: {
            product_id: item.productid,
            warehouse_id: id,
            stock: item.amount,
            logs: {
              create: {
                action: 'inbound',
                amount: item.amount,
                created_by: auth.username,
              },
            },
          },
          update: {
            stock: { increment: item.amount },
            logs: {
              create: {
                action: 'inbound',
                amount: item.amount,
                created_by: auth.username,
              },
            },
          },
          where: {
            product_id_warehouse_id: {
              product_id: item.productid,
              warehouse_id: id,
            },
          },
        })
      )
    );

    await this.checkDemands(
      stocks.map((stock) => ({
        productId: stock.product_id,
        amount: stock.stock,
      })),
      id,
      auth,
      { source: 'inbound', id: inbound.id }
    );
    return inbound.id;
  }

  async checkDemands(
    stocks: { productId: string; amount: number }[],
    id: string,
    auth: AuthWrapper,
    remarks: any
  ): Promise<number[]> {
    return Promise.all(
      stocks.map(async (stock) => {
        const demands = await this.db.demand.findMany({
          where: {
            warehouse_id: id,
            product_id: stock.productId,
            fulfiled_outbound_id: null,
          },
          orderBy: { created_at: 'asc' },
        });

        let available = stock.amount;
        const updatedDemands = new Array<{
          id: string;
          productId: string;
          shopId: string;
          amount: number;
          unfullfiled?: number;
        }>();

        for (let i = 0; i < demands.length && available > 0; i += 1) {
          const demand = demands[i];
          updatedDemands.push({
            id: demand.id,
            productId: demand.product_id,
            shopId: demand.shop_id,
            amount: available > demand.amount ? demand.amount : available,
            unfullfiled:
              available > demand.amount ? undefined : demand.amount - available,
          });
          available = available > demand.amount ? available - demand.amount : 0;
        }

        if (stock.amount === available || updatedDemands.length === 0) return available;

        const newStock = this.db.stock.update({
          where: {
            product_id_warehouse_id: {
              product_id: stock.productId,
              warehouse_id: id,
            },
          },
          data: {
            stock: available,
            logs: {
              create: {
                amount: stock.amount - available,
                created_by: auth.username,
                action: 'fullfilDemand',
              },
            },
          },
        });

        const newDemands = updatedDemands.map((demand) =>
          this.db.demand.update({
            where: { id: demand.id },
            data: {
              fulfiled_at: new Date(),
              fulfiled_outbound: {
                create: {
                  amount: demand.amount,
                  product_id: demand.productId,
                  warehouse_id: id,
                  shop_id: demand.shopId,
                  created_by: auth.username,
                },
              },
              unfulfilled_demand: demand.unfullfiled
                ? {
                    create: {
                      warehouse_id: id,
                      product_id: demand.productId,
                      shop_id: demand.shopId,
                      created_by: auth.username,
                      amount: demand.unfullfiled,
                      remarks,
                    },
                  }
                : undefined,
            },
          })
        );
        const data = await this.db.$transaction([newStock, ...newDemands]);
        return data[0].stock;
      })
    );
  }

  async getInbounds(
    warehouseId: string,
    offset: number = 0,
    limit: number = 10
  ): Promise<InboundModel[]> {
    const data = await this.db.inbound.findMany({
      skip: offset * limit,
      take: limit,
      where: { warehouse: warehouseId },
      include: { inbound_item: true },
      orderBy: { created_at: 'desc' },
    });
    return data.map((item) => InboundModel.fromDB(item));
  }

  async checkStock(
    warehouseId: string,
    items: { productId: string; amount: number }[]
  ): Promise<{
    errors: { productId: string; expected: number; actual: number }[];
  }> {
    if (items.length === 0) throw new FieldEmpty('items');
    const status = items.map(async (item) => {
      const check = await this.db.stock.findUnique({
        where: {
          product_id_warehouse_id: {
            warehouse_id: warehouseId,
            product_id: item.productId,
          },
        },
      });
      if (!check) {
        await this.db.stock.create({
          data: {
            stock: 0,
            product_id: item.productId,
            warehouse_id: warehouseId,
          },
        });
        return {
          productId: item.productId,
          expected: item.amount,
          actual: 0,
        };
      }
      if (check.stock < item.amount) {
        return {
          productId: item.productId,
          expected: item.amount,
          actual: check.stock,
        };
      }
      return undefined;
    });
    const errors = (await Promise.all(status)).filter((value) => value);
    return { errors };
  }

  async addTransfer(
    auth: AuthWrapper,
    warehouseId: string,
    destinationId: string,
    items: { productId: string; amount: number }[]
  ): Promise<string> {
    const errors = await this.checkStock(warehouseId, items);
    if (errors.errors.length !== 0) {
      throw new NotEnoughItems(errors);
    }
    await auth.log(
      this.db,
      'transfer',
      AuthWrapper.structRemarks(warehouseId, { destinationId })
    );
    await this.db.$transaction(
      items.map((item) =>
        this.db.stock.update({
          data: {
            stock: {
              decrement: item.amount,
            },
            logs: {
              create: {
                action: 'transfer-out',
                amount: item.amount,
                created_by: auth.username,
              },
            },
          },
          where: {
            product_id_warehouse_id: {
              warehouse_id: warehouseId,
              product_id: item.productId,
            },
          },
        })
      )
    );
    const destinations = await this.db.$transaction(
      items.map((item) =>
        this.db.stock.upsert({
          where: {
            product_id_warehouse_id: {
              product_id: item.productId,
              warehouse_id: destinationId,
            },
          },
          create: {
            warehouse_id: destinationId,
            product_id: item.productId,
            stock: item.amount,
            logs: {
              create: {
                action: 'transfer-in',
                amount: item.amount,
                created_by: auth.username,
              },
            },
          },
          update: {
            stock: { increment: item.amount },
            logs: {
              create: {
                action: 'transfer-in',
                amount: item.amount,
                created_by: auth.username,
              },
            },
          },
        })
      )
    );
    const transfer = await this.db.transfer.create({
      data: {
        warehouse: warehouseId,
        destination: destinationId,
        created_by: auth.username,
        transfer_item: {
          create: items.map((item) => ({
            product_id: item.productId,
            amount: item.amount,
          })),
        },
      },
    });

    await this.checkDemands(
      destinations.map((item) => ({
        productId: item.product_id,
        amount: item.stock,
      })),
      destinationId,
      auth,
      {
        source: 'transfer',
        id: transfer.id,
      }
    );

    return transfer.id;
  }

  async getTransfers(
    warheouseId: string,
    destinationId: string,
    offset: number = 0,
    limit: number = 10
  ): Promise<TransferModel[]> {
    const data = await this.db.transfer.findMany({
      skip: offset * limit,
      take: limit,
      where: { warehouse: warheouseId, destination: destinationId },
      orderBy: { created_at: 'desc' },
      include: { transfer_item: true },
    });
    return data.map((item) => TransferModel.fromDB(item));
  }
}
