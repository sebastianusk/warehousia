import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NestMiddleware,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import { Observable } from 'rxjs';
import AdminService from '../admin/admin.service';

function getAuthKey(req: Request): string {
  try {
    return req.headers.get('Authorization').split(' ')[1];
  } catch {
    throw new AuthenticationError('no Auth header provided');
  }
}

@Injectable()
export default class AuthInterceptor implements NestInterceptor {
  constructor(private adminService: AdminService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().request;
    const key = getAuthKey(req);
    const username = await this.adminService.authenticate(key);
    ctx.getContext().username = username;
    return next.handle();
  }
}
