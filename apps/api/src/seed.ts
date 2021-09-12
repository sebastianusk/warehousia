import AdminService from './admin/admin.service';
import AuthWrapper from './auth/auth.wrapper';
import DBService from './db/db.service';
import { Feature } from './warehouse/warehouse.dto';
import WarehouseService from './warehouse/warehouse.service';

const db = new DBService();

const adminService = new AdminService(db);

const warehouseService = new WarehouseService(db);

async function createUser(
  username: string,
  password: string,
  warehouse: string[],
  role: string
) {
  await adminService
    .addAdmin(username, password, warehouse, role)
    .catch(console.log);
}

async function createLog(username: string, action: string, remarks: any) {
  await adminService.createLog(username, action, remarks).catch(console.log);
}

async function createWarehouse(id: string, name: string, features: Feature[]) {
  await warehouseService
    .createWarehouse(new AuthWrapper('bubur'), id, name, features)
    .catch(console.log);
}

async function seed() {
  await createUser('bubur', 'bubur123', undefined, 'SUPER_ADMIN');
  await createUser('ferdian', 'ferdian123', ['tangerang'], 'ADMIN');
  await createUser('sebo', 'sebo123', ['serpong'], 'ADMIN');
  await createLog('bubur', 'createOrder', { orderId: 123 });
  await createLog('bubur', 'changePass', undefined);
  await createLog('bubur', 'changeRole', undefined);
  await createLog('bubur', 'createWarehouse', { warehouseId: 555 });
  await createLog('bubur', 'createOutbound', { outboundId: 1255 });
  await createLog('bubur', 'createOrder', { orderId: 789 });
  await createWarehouse('tangerang', 'Konter Tangerang', [
    Feature.INBOUND,
    Feature.OUTBOUND,
    Feature.TRANSFER,
  ]);
  await createWarehouse('serpong', 'Konter Serpong', [
    Feature.INBOUND,
    Feature.OUTBOUND,
  ]);
}

seed().finally(() => {
  console.log('seed completed');
  process.exit(0);
});
