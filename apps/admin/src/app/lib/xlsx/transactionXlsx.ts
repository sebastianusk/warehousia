import XLSX from 'xlsx';
import { fitToColumn } from 'app/helper/xlsx';

export default function JsonAsXlsx(dataSource: any) {
  const filename = `${dataSource.id}.xlsx`;
  const data = [
    ['TRANSAKSI'],
    ['ID Transaksi:', dataSource.id],
    ['Gudang:', dataSource.warehouseId],
    ['Toko:', dataSource.shopId],
    ['', ''],
    ['Product Id', 'Quantity'],
  ];
  const sortedItems = [...dataSource.items].sort((a, b) => b.amount - a.amount);
  sortedItems.forEach((el: any) => {
    data.push([el.productId, el.amount]);
  });
  const ws = XLSX.utils.aoa_to_sheet(data);
  ws['!cols'] = fitToColumn(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Transaksi');
  XLSX.writeFile(wb, filename);
}
