import { SetMetadata } from '@nestjs/common';
import { RoleModel } from '../admin/admin.dto';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleModel[]) => SetMetadata(ROLES_KEY, roles);
