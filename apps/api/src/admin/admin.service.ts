import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import DBService from '../db/db.service';
import AdminModel from './admin.dto';
import { CreateUserError } from '../common/errors';

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
      console.log(error);
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
}
