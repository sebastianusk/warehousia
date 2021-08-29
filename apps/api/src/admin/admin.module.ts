import { Module } from '@nestjs/common';
import DBModule from '../db/db.module';
import AdminResolver from './admin.resolver';
import AdminService from './admin.service';
import {AbilityFactory} from './factory';

@Module({
  imports: [DBModule],
  providers: [AdminResolver, AdminService, AbilityFactory],
  exports: [AdminService, AbilityFactory],
})
export default class AdminModule {}
