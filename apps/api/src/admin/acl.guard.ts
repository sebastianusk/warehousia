import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import AdminService from '../admin/admin.service';
import { CHECK_POLICIES_KEY } from './acl.decorator';
import { AbilityFactory, AppAbility } from './factory';
import { PolicyHandler } from './policy-handler';

@Injectable()
export default class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
    private adminService: AdminService
  ) {}

  async canActivate(context: ExecutionContext) {
    const policyHandlers = this.reflector.getAllAndOverride<PolicyHandler[]>(
      CHECK_POLICIES_KEY,
      [context.getHandler()]
    );
    if (!policyHandlers) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const { username } = ctx.getContext().req.user;
    if (!username) {
      return false;
    }
    const user = await this.adminService.findOne(username);
    const ability = this.abilityFactory.createForUser(user);
    return policyHandlers.every((handler) =>
      PoliciesGuard.execPolicyHandler(handler, ability)
    );
  }

  static execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
