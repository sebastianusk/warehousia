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

  const toBold = ['A1', 'A6', 'B6'];
  toBold.forEach((val) => {
    ws[val].s = {
      font: {
        bold: true,
      },
    };
  });

  const columnIndex = ['A', 'B'];
  columnIndex.forEach((col) => {
    for (let i = 0; i <= sortedItems.length; i += 1) {
      ws[`${col}${6 + i}`].s = {
        border: {
          top: { style: 'thin', color: { rgb: 'FF000000' } },
          right: { style: 'thin', color: { rgb: 'FF000000' } },
          bottom: { style: 'thin', color: { rgb: 'FF000000' } },
          left: { style: 'thin', color: { rgb: 'FF000000' } },
        },
      };
    }
  });

  ws['!cols'] = fitToColumn(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Transaksi');
  XLSX.writeFile(wb, filename);
}
