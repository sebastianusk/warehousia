import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import ShopModel from '../shop/shop.dto';
import WarehouseModel from '../warehouse/warehouse.dto';
import { AdminModel, RoleModel } from './admin.dto';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects =
  | InferSubjects<typeof AdminModel>
  | InferSubjects<typeof WarehouseModel>
  | InferSubjects<typeof ShopModel>
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  // eslint-disable-next-line class-methods-use-this
  createForUser(admin: AdminModel) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>
    );
    if (admin.role === RoleModel.SUPER_ADMIN) {
      can(Action.Manage, 'all');
    }
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
