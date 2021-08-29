import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AddAdminInput } from '../graphql';
import DBService from '../db/db.service';
import { getEnvNumber } from '../config';
import { admin } from '.prisma/client';

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

  async findOne(username: string): Promise<admin> {
    return this.db.admin.findFirst({ where: { username } });
  }
}
