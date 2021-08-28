import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import AdminService from '../admin/admin.service';

@Injectable()
export default class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.adminService.findOne(username);
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      return user;
    }
    return null;
  }

  async login(user: any): Promise<string> {
    const payload = { username: user.username };
    return this.jwtService.sign(payload);
  }
}
