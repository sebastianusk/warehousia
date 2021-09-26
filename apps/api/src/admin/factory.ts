import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { ProductModel } from '../product/product.dto';
import ShopModel from '../shop/shop.dto';
import WarehouseModel, { Feature } from '../warehouse/warehouse.dto';
import { AdminModel, RoleModel } from './admin.dto';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
}

type Subjects =
  | InferSubjects<typeof AdminModel>
  | InferSubjects<typeof WarehouseModel>
  | InferSubjects<typeof ShopModel>
  | InferSubjects<typeof ProductModel>
  | InferSubjects<typeof Feature.INBOUND>
  | InferSubjects<typeof Feature.OUTBOUND>
  | InferSubjects<typeof Feature.TRANSFER>
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  // eslint-disable-next-line class-methods-use-this
  createForUser(admin: AdminModel, warehouse: WarehouseModel) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>
    );
    if (admin.role === RoleModel.SUPER_ADMIN) {
      can(Action.Manage, 'all');
    }

    if (warehouse && admin.warehouses.includes(warehouse.id)) {
      warehouse.features.forEach((feature) => {
        can(Action.Create, feature);
      });
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
