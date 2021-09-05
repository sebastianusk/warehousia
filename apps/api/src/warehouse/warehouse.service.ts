import { Injectable } from '@nestjs/common';
import DBService from '../db/db.service';
import WarehouseModel, { Feature } from './warehouse.dto';

@Injectable()
export default class WarehouseService {
  constructor(private db: DBService) {}

  async createWarehouse(name: string, features: Feature[]): Promise<string> {
    const warehouse = await this.db.warehouse.create({
      data: {
        name,
        features: features.map((item) => item.toString()),
      },
    });
    return warehouse.name;
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
}
