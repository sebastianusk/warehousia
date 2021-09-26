import { Injectable } from '@nestjs/common';
import AuthWrapper from '../auth/auth.wrapper';
import DBService from '../db/db.service';
import { InboundModel } from './stock.dto';
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
    const result = await this.db.$transaction([inbound, ...stocks]);
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
}
