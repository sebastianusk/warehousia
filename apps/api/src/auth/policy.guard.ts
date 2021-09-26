import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PolicyHandler } from './policy-handler';
import { CHECK_POLICIES_KEY } from './policy.decorator';
import { AbilityFactory, AppAbility } from './policy.factory';

@Injectable()
export default class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory
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
    const { user, warehouse } = ctx.getContext();
    if (!user) {
      return false;
    }
    const ability = this.abilityFactory.createForUser(user, warehouse);
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
