import excel from 'xlsx';

export default function parseExcel(file: File): Promise<string[][]> {
  const reader = new FileReader();
  const promise = new Promise<string[][]>((resolve, reject) => {
    reader.onload = (e) => {
      if (e.target) {
        const ab = e.target.result;
        const wb = excel.read(ab, { type: 'array' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = excel.utils.sheet_to_json<string[]>(ws, { header: 1 });
        resolve(data.slice(1));
        return;
      }
      reject();
    };
  });
  reader.readAsArrayBuffer(file);
  return promise;
}
