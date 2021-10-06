import { Injectable } from '@nestjs/common';
import {NotEnoughItem} from '../common/errors';
import DBService from '../db/db.service';

@Injectable()
export default class TransactionService {
  constructor(private db: DBService) {}


}
