import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import PoliciesGuard from '../admin/acl.guard';
import AdminResolver from '../admin/admin.resolver';
import AdminService from '../admin/admin.service';
import { AbilityFactory } from '../admin/factory';
import DBModule from '../db/db.module';
import WarehouseGuard from '../warehouse/warehouse.guard';
import WarehouseService from '../warehouse/warehouse.service';
import AuthResolver from './auth.resolver';
import AuthService from './auth.service';
import jwtConstants from './constant';
import JwtStrategy from './jwt.strategy';

@Module({
  imports: [
    DBModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [
    AuthResolver,
    AbilityFactory,
    PoliciesGuard,
    WarehouseGuard,
    JwtStrategy,
    AuthService,
    AdminService,
    WarehouseService,
  ],
  exports: [AbilityFactory, AdminService, WarehouseService],
})
export default class AuthModule {}
