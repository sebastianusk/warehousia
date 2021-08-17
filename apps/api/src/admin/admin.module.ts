import { Module } from '@nestjs/common';
import DBModule from '../db/db.module';
import AdminResolver from './admin.resolver';
import AdminService from './admin.service';

@Module({
  imports: [DBModule],
  providers: [AdminResolver, AdminService],
})
export default class AdminModule {}
