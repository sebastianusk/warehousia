import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AddAdminInput } from '../graphql';
import DBService from '../db/db.service';

export type AdminInputModel = {
  username: string;
  password: string;
  role: string;
  warehouse: string[];
};

const saltRounds = 10;

@Injectable()
export default class AdminService {
  constructor(private db: DBService) {}

  async addAdmin(input: AddAdminInput): Promise<string> {
    const hashedPassword = await bcrypt.hash(input.password, saltRounds);
    const data = await this.db.admin.create({
      data: {
        username: input.username,
        password: hashedPassword,
        warehouses: input.warehouse,
        role: input.role,
      },
    });
    return data.username;
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.db.admin.findFirst({
      where: {
        username,
      },
    });
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new Error('username/password false');
    }
    const session = await this.db.session.create({
      data: {
        username,
        expiredAt: new Date().toISOString(),
      },
    });
    return session.key;
  }
}
