/* eslint-disable max-classes-per-file */
import { admin } from '.prisma/client';
import { Admin, AdminLog, Role } from '../graphql';

export enum RoleModel {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export class AdminModel {
  static fromDBRole(role: string): RoleModel {
    if (role === 'SUPER_ADMIN') {
      return RoleModel.SUPER_ADMIN;
    }
    return RoleModel.ADMIN;
  }

  constructor(
    public username: string,
    public role: RoleModel,
    public warehouse: string[],
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  static fromDB(data: admin): AdminModel {
    return new AdminModel(
      data.username,
      AdminModel.fromDBRole(data.role),
      data.warehouses,
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
}
