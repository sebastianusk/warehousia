import { Module } from '@nestjs/common';
import DBService from './db.service';

@Module({
  providers: [DBService],
  exports: [DBService],
})
export default class DBModule {}
