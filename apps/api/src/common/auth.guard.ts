import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthenticationError } from 'apollo-server-express';
import AdminService from '../admin/admin.service';

function getAuthKey(req: Request): string {
  try {
    return req.headers.get('Authorization').split(' ')[1];
  } catch {
    throw new AuthenticationError('no Auth header provided');
  }
}

@Injectable()
export default class AuthMiddleware implements NestMiddleware {
  constructor(private adminService: AdminService) {}

  use(req: Request) {
    const key = getAuthKey(req);
    const username = await this.adminService.authenticate(key);
    return true;
  }
}
