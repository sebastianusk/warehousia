import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type Columns = {
  header: string;
  dataKey: string;
}[];

export default function createPdf(
  data: any,
  columns: Columns,
  type: string,
  id: string
) {
  const doc = new JsPDF();
  doc.text(`Type: ${type} ---  Id: ${id}`, 30, 10);
  autoTable(doc, {
    body: data,
    columns,
  });
  doc.save(`${type}_${id}.pdf`);
}
