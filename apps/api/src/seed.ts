import AdminService from './admin/admin.service';
import AuthWrapper from './auth/auth.wrapper';
import DBService from './db/db.service';
import ShopService from './shop/shop.service';
import { Feature } from './warehouse/warehouse.dto';
import WarehouseService from './warehouse/warehouse.service';

const db = new DBService();
const adminService = new AdminService(db);
const warehouseService = new WarehouseService(db);
const shopService = new ShopService(db);
const auth = new AuthWrapper('bubur');

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

async function createWarehouse(id: string, name: string, features: Feature[]) {
  await warehouseService
    .createWarehouse(auth, id, name, features)
    .catch(console.log);
}

async function createShop(id: string, name: string) {
  await shopService.createShop(auth, id, name).catch(console.log);
}

async function seed() {
  await createUser('bubur', 'bubur123', undefined, 'SUPER_ADMIN');
  await createWarehouse('tangerang', 'Konter Tangerang', [
    Feature.INBOUND,
    Feature.OUTBOUND,
    Feature.TRANSFER,
  ]);
  await createWarehouse('serpong', 'Konter Serpong', [
    Feature.INBOUND,
    Feature.OUTBOUND,
  ]);
  await createUser('ferdian', 'ferdian123', ['tangerang'], 'ADMIN');
  await createUser('sebo', 'sebo123', ['serpong', 'tangerang'], 'ADMIN');
  await createShop('tokopedia', 'Tokopedia utama');
  await createShop('shopee1', 'Shopee Tas');
  await createShop('shopee2', 'Shopee Gelang');
}

seed().finally(async () => {
  console.log('seed completed');
  await db.$disconnect();
});
