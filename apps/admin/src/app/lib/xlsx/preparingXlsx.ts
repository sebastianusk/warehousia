import XLSX from 'xlsx';
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
    ['Product Id', 'Amount'],
  ];
  dataSource.forEach((el: any) => {
    data.push([el.productId, el.actual]);
  });
  const ws = XLSX.utils.aoa_to_sheet(data);
  ws['!cols'] = fitToColumn(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Preparation');
  XLSX.writeFile(wb, filename);
}
