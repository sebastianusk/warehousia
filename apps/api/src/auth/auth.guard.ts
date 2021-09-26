import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import AdminService from '../admin/admin.service';
import AuthWrapper from './auth.wrapper';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private adminService: AdminService) {
    super();
  }

  // eslint-disable-next-line class-methods-use-this
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().request;
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const result = await super.canActivate(context);
    if (!result) {
      return result;
    }
    const ctx = GqlExecutionContext.create(context);
    const { username } = ctx.getContext().req.user;
    const user = await this.adminService.findOne(username);
    ctx.getContext().user = user;
    if (!user.active) {
      return false;
    }
    return result;
  }
}

export const CurrentAuth = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthWrapper => {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext();
    return new AuthWrapper(user.username);
  }
);
