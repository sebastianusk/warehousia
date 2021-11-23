import XLSX from 'xlsx-js-style';
import { fitToColumn } from 'app/helper/xlsx';

type PreparingProps = {
  items: {
    productId: string;
    productName: string;
    actual: number;
  }[];
  id: string;
  warehouseId: string;
  shops: string[];
};

export default function preparingXlsx({
  items,
  id,
  warehouseId,
  shops,
}: PreparingProps) {
  const filename = `${id}.xlsx`;
  const data = [
    ['LIST CARI GUDANG'],
    ['Preparation ID:', id],
    ['Gudang:', warehouseId],
    ['Toko:', shops.join(', ')],
    ['', '', ''],
    ['Product Id', 'Product Name', 'Quantity'],
  ];
  items.forEach((el: any) => {
    data.push([el.productId, el.productName, el.actual]);
  });
  const ws = XLSX.utils.aoa_to_sheet(data);

  ws.A1.s = {
    font: {
      bold: true,
    },
  };

  const colHead = ['A6', 'B6', 'C6'];
  colHead.forEach((val) => {
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

  const columnIndex = ['A', 'B', 'C'];
  columnIndex.forEach((col) => {
    for (let i = 0; i < items.length; i += 1) {
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
  XLSX.utils.book_append_sheet(wb, ws, 'Preparation');
  XLSX.writeFile(wb, filename);
}
