import { Module } from '@nestjs/common';
import AuthModule from '../auth/auth.module';
import DBModule from '../db/db.module';
import AdminResolver from './admin.resolver';

@Module({
  imports: [AuthModule, DBModule],
  providers: [AdminResolver],
})
export default class AdminModule {}
