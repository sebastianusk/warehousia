import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AddAdminInput } from '../graphql';
import DBService from '../db/db.service';
import AdminModel from './admin.dto';
import { CreateUserError } from '../common/errors';

const saltRounds = 10;

@Injectable()
export default class AdminService {
  constructor(private db: DBService) {}

  async addAdmin(input: AddAdminInput): Promise<string> {
    const hashedPassword = await bcrypt.hash(input.password, saltRounds);
    try {
      const data = await this.db.admin.create({
        data: {
          username: input.username,
          password: hashedPassword,
          warehouses: input.warehouse,
          role: input.role,
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
}
