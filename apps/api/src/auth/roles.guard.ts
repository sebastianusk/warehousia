import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RoleModel } from '../admin/admin.dto';
import AdminService from '../admin/admin.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private adminService: AdminService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleModel[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!requiredRoles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const { username } = ctx.getContext().req.user;
    if (!username) {
      return false;
    }
    const user = await this.adminService.findOne(username);
    return requiredRoles.includes(user.role);
  }
}
