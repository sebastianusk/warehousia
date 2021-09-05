import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import DBService from '../db/db.service';
import { CreateUserError } from '../common/errors';
import { AdminLogModel, AdminModel, RoleModel } from './admin.dto';

const saltRounds = 10;

@Injectable()
export default class AdminService {
  constructor(private db: DBService) {}

  async addAdmin(
    username: string,
    password: string,
    warehouse: string[],
    role: string
  ): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try {
      const data = await this.db.admin.create({
        data: {
          username,
          password: hashedPassword,
          warehouses: warehouse,
          role,
        },
      });
      return data.username;
    } catch (error) {
      throw new CreateUserError();
    }
  }

  async validateUser(username: string, password: string): Promise<AdminModel> {
    const user = await this.db.admin.findFirst({ where: { username } });
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      return AdminModel.fromDB(user);
    }
    return null;
  }

  async findOne(username: string): Promise<AdminModel> {
    const data = await this.db.admin.findFirst({ where: { username } });
    const model = AdminModel.fromDB(data);
    return model;
  }

  async getList(
    query: string,
    limit: number,
    offset: number
  ): Promise<AdminModel[]> {
    const data = await this.db.admin.findMany({
      skip: offset * limit,
      take: limit,
      where: {
        username: {
          startsWith: query,
        },
      },
    });
    return data.map((item) => AdminModel.fromDB(item));
  }

  async createLog(
    username: string,
    action: string,
    remarks: any
  ): Promise<string> {
    const data = await this.db.adminlog.create({
      data: {
        username,
        action,
        remarks,
      },
    });
    return data.id;
  }

  async getLogs(
    username: string,
    limit: number = 5,
    offset: number = 0,
    startDate: Date = new Date('2020-03-19T14:21:00+0200'),
    endDate: Date = new Date()
  ): Promise<AdminLogModel[]> {
    const data = await this.db.adminlog.findMany({
      take: limit,
      skip: offset * limit,
      where: {
        username: {
          equals: username,
        },
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return data.map((item) => AdminLogModel.fromDB(item));
  }

  async editAdmin(
    username: string,
    role: RoleModel,
    warehouses: string[]
  ): Promise<string> {
    const updated = await this.db.admin.update({
      where: {
        username,
      },
      data: {
        role,
        warehouses,
      },
    });
    return updated.username;
  }
}
