import { Injectable } from '@nestjs/common';
import AuthWrapper from '../auth/auth.wrapper';
import DBService from '../db/db.service';
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
}
