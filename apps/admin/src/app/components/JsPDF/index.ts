import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type Columns = {
  header: string;
  dataKey: string;
}[];

export default function createPdf(data: any, columns: Columns, id: string) {
  const doc = new JsPDF();
  autoTable(doc, {
    body: data,
    columns,
  });
  doc.save(`${id}.pdf`);
}
