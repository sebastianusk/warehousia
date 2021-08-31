import AdminService from './admin/admin.service';
import DBService from './db/db.service';

const db = new DBService();

const admin = new AdminService(db);

async function seed() {
  await admin.addAdmin('bubur', 'bubur123', undefined, 'SUPER_ADMIN');
  await admin.addAdmin('ferdian', 'ferdian123', ['shopee'], 'ADMIN');
  await admin.addAdmin('sebo', 'sebo', ['lazada'], 'ADMIN');
  await db.adminlog.createMany({
    data: [
      { username: 'bubur', action: 'createOrder', remarks: { orderId: 123 } },
      { username: 'bubur', action: 'changePassword' },
      {
        username: 'bubur',
        action: 'createWarehouse',
        remarks: { warehouseId: 123 },
      },
      { username: 'bubur', action: 'createOrder', remarks: { orderId: 443 } },
      { username: 'bubur', action: 'changeRole' },
      {
        username: 'bubur',
        action: 'createTransaction',
        remarks: { transactionId: 123 },
      },
      { username: 'bubur', action: 'createOrder', remarks: { orderId: 5551 } },
    ],
  });
}

seed();
