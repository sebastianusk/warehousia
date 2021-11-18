import XLSX from 'xlsx-js-style';
import { fitToColumn } from 'app/helper/xlsx';

export default function preparingXlsx(
  dataSource: any,
  id: string,
  warehouseId: string,
  shopIds: string[]
) {
  const filename = `${id}.xlsx`;
  const data = [
    ['LIST CARI GUDANG'],
    ['Preparation ID:', id],
    ['Gudang:', warehouseId],
    ['Toko:', shopIds.join(', ')],
    ['', ''],
    ['Product Id', 'Quantity'],
  ];
  dataSource.forEach((el: any) => {
    data.push([el.productId, el.actual]);
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
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= dataSource.length; i += 1) {
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
  XLSX.utils.book_append_sheet(wb, ws, 'Preparation');
  XLSX.writeFile(wb, filename);
}
