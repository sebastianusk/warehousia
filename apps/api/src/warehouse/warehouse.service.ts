import { Injectable } from '@nestjs/common';
import AuthWrapper from '../auth/auth.wrapper';
import { NotEnoughItem, NotEnoughItems } from '../common/errors';
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
      skip: offset * limit,
      take: limit,
      where: {
        name: {
          startsWith: query,
        },
      },
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
    const inbound = this.db.inbound.create({
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
    const log = auth.log(this.db, 'inbound', { id });
    const stocks = items.map((item) =>
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
    );
    const result = await this.db.$transaction([inbound, log, ...stocks]);
    return result[0].id;
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
    const status = items.map(async (item) => {
      const check = await this.db.stock.findUnique({
        where: {
          product_id_warehouse_id: {
            warehouse_id: warehouseId,
            product_id: item.productId,
          },
        },
      });
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
    const transactions = items.map(async (item) => {
      const source = this.db.stock.update({
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
      });
      const destination = this.db.stock.upsert({
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
      });
      return [source, destination];
    });
    const transfer = this.db.transfer.create({
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
    const log = auth.log(
      this.db,
      'transfer',
      AuthWrapper.structRemarks(warehouseId, { destinationId })
    );

    const listTransaction = (await Promise.all(transactions)).flatMap(
      (item) => item
    );

    const data = await this.db.$transaction([
      transfer,
      log,
      ...listTransaction,
    ]);
    return data[0].id;
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
