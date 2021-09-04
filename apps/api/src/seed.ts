import AdminService from './admin/admin.service';
import DBService from './db/db.service';

const db = new DBService();

const admin = new AdminService(db);

async function seed() {
  // await admin.addAdmin('bubur', 'bubur123', undefined, 'SUPER_ADMIN');
  // await admin.addAdmin('ferdian', 'ferdian123', ['shopee'], 'ADMIN');
  // await admin.addAdmin('sebo', 'sebo', ['lazada'], 'ADMIN');
  await admin.createLog('bubur', 'createOrder', { orderId: 123 });
  await admin.createLog('bubur', 'changePass', undefined);
  await admin.createLog('bubur', 'changeRole', undefined);
  await admin.createLog('bubur', 'createOrder', { orderId: 456 });
  await admin.createLog('bubur', 'createWarehouse', { warehouseId: 555 });
  await admin.createLog('bubur', 'createOutbound', { outboundId: 1255 });
  await admin.createLog('bubur', 'createOrder', { orderId: 789 });
}

seed();
