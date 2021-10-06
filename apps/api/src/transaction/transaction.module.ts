import { Module } from '@nestjs/common';
import AuthModule from '../auth/auth.module';
import DBModule from '../db/db.module';
import TransactionResolver from './transaction.resolver';
import TransactionService from './transaction.service';

@Module({
  imports: [DBModule, AuthModule],
  providers: [TransactionService, TransactionResolver],
})
export default class TransactionModule {}
