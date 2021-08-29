import AdminService from './admin/admin.service';
import DBService from './db/db.service';

const db = new DBService();

const admin = new AdminService(db);

async function seed() {
  await admin.addAdmin('bubur', 'bubur123', undefined, 'SUPER_ADMIN');
  await admin.addAdmin('ferdian', 'ferdian123', ['shopee'], 'ADMIN');
  await admin.addAdmin('sebo', 'sebo', ['lazada'], 'ADMIN');
}

seed();
