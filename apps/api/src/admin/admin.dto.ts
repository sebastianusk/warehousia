/* eslint-disable max-classes-per-file */
import { adminlog, admin } from '.prisma/client';
import { Admin, AdminLog, Role } from '../graphql';

export enum RoleModel {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export class AdminModel {
  static fromStringRole(role: string): RoleModel {
    switch (role) {
      case 'SUPER_ADMIN':
        return RoleModel.SUPER_ADMIN;
      case 'ADMIN':
        return RoleModel.ADMIN;
      default:
        return undefined;
    }
  }

  constructor(
    public username: string,
    public role: RoleModel,
    public warehouse: string[],
    public active: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  static fromDB(data: admin): AdminModel {
    return new AdminModel(
      data.username,
      AdminModel.fromStringRole(data.role),
      data.warehouses,
      data.active,
      data.createdAt,
      data.updatedAt
    );
  }

  static toResponseRole(role: RoleModel): Role {
    if (role === RoleModel.SUPER_ADMIN) {
      return Role.SUPER_ADMIN;
    }
    return Role.ADMIN;
  }

  toResponse(): Admin {
    return {
      username: this.username,
      role: AdminModel.toResponseRole(this.role),
      active: this.active,
      updatedAt: this.updatedAt.toISOString(),
      createdAt: this.createdAt.toISOString(),
      warehouses: this.warehouse,
    };
  }
}

export class AdminLogModel {
  constructor(
    public action: string,
    public createdAt: Date,
    public remarks: any
  ) {}

  toResponse(): AdminLog {
    return {
      action: this.action,
      createdAt: this.createdAt.toISOString(),
      remarks: JSON.stringify(this.remarks),
    };
  }

  static fromDB(data: adminlog): AdminLogModel {
    return new AdminLogModel(data.action, data.createdAt, data.remarks);
  }
}
