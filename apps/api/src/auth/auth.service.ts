import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import AdminService from '../admin/admin.service';
import { LoginError } from '../common/errors';

@Injectable()
export default class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService
  ) {}

  async login(username: string, password: string): Promise<string> {
    const user = await this.adminService.validateUser(username, password);
    if (!user) {
      throw new LoginError();
    }
    return this.jwtService.sign(user);
  }
}
