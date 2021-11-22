import XLSX from 'xlsx-js-style';
import { fitToColumn } from 'app/helper/xlsx';

export default function JsonAsXlsx(dataSource: any) {
  const filename = `${dataSource.id}.xlsx`;
  const data = [
    ['TRANSAKSI'],
    ['ID Transaksi:', dataSource.id],
    ['Gudang:', dataSource.warehouseId],
    ['Toko:', dataSource.shops.join(', ')],
    ['', ''],
    ['Product Id', 'Product Name', 'Quantity', 'Price', 'Total'],
  ];
  const sortedItems = [...dataSource.items].sort((a, b) => b.amount - a.amount);
  let totalPrice = 0;
  sortedItems.forEach((el: any) => {
    const total = el.price * el.amount;
    totalPrice += total;
    data.push([el.productId, el.name, el.amount, el.price, total]);
  });
  data.push(['', '', '', '', totalPrice]);

  const ws = XLSX.utils.aoa_to_sheet(data);

  ws.A1.s = {
    font: {
      bold: true,
    },
  };

  const toBorderedandBold = [
    'A6',
    'B6',
    'C6',
    'D6',
    'E6',
    `E${sortedItems.length + 7}`,
  ];
  toBorderedandBold.forEach((val) => {
    ws[val].s = {
      font: {
        bold: true,
      },
      border: {
        top: { style: 'thin', color: { rgb: 'FF000000' } },
        right: { style: 'thin', color: { rgb: 'FF000000' } },
        bottom: { style: 'thin', color: { rgb: 'FF000000' } },
        left: { style: 'thin', color: { rgb: 'FF000000' } },
      },
    };
  });

  const columnIndex = ['A', 'B', 'C', 'D', 'E'];
  columnIndex.forEach((col) => {
    for (let i = 0; i < sortedItems.length; i += 1) {
      ws[`${col}${7 + i}`].s = {
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
