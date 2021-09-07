import { Injectable } from '@nestjs/common';
import DBService from '../db/db.service';
import WarehouseModel, { Feature } from './warehouse.dto';

@Injectable()
export default class WarehouseService {
  constructor(private db: DBService) {}

  async createWarehouse(
    username: string,
    id: string,
    name: string,
    features: Feature[]
  ): Promise<string> {
    const result = await this.db.$transaction([
      this.db.warehouse.create({
        data: {
          id,
          name,
          features: features.map((item) => item.toString()),
        },
      }),
      this.db.adminlog.create({
        data: {
          username,
          action: 'createWarehouse',
          remarks: { warehouseName: name },
        },
      }),
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
    username: string,
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
      this.db.adminlog.create({
        data: {
          username,
          action: 'updateWarehouse',
          remarks: {
            changedFields: Object.entries({ name, features, active })
              .filter((entry) => entry[1] !== undefined)
              .map((entry) => entry[0]),
          },
        },
      }),
    ]);
    return result[0].id;
  }
}
