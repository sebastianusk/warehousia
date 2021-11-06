import DBService from './db/db.service';

const db = new DBService();

async function fixStock(): Promise<void> {
  const products = await db.product.findMany();
  const warehouses = await db.warehouse.findMany();
  const productsWarehouses = products.flatMap((product) =>
    warehouses.map((warehouse) => ({
      warehouse: warehouse.id,
      product: product.id,
    }))
  );
  console.log(productsWarehouses);
  await db.stock.createMany({
    data: productsWarehouses.map((stock) => ({
      warehouse_id: stock.warehouse,
      product_id: stock.product,
      stock: 0,
    })),
    skipDuplicates: true,
  });
}

fixStock().finally(async () => {
  console.log('stock fixed');
  await db.$disconnect();
});
