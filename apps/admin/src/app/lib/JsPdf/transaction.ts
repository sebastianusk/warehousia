import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function createTransactionPdf(data: any) {
  const doc = new JsPDF();
  doc.setFontSize(12);
  doc.text(
    [
      `Transaction Id: ${data.id}`,
      `Warehouse Id: ${data.warehouseId}`,
      `Shop Id: ${data.shopId}`,
      `Created By: ${data.createdBy}`,
      `${new Date(data.createdAt).toLocaleDateString('en-GB')}`,
    ],
    10,
    10
  );
  autoTable(doc, {
    body: data.items,
    columns: [
      { header: 'Product Id', dataKey: 'productId' },
      { header: 'Amount', dataKey: 'amount' },
    ],
    startY: 44,
  });
  doc.save(`${data.shopId}_${data.id}.pdf`);
}
