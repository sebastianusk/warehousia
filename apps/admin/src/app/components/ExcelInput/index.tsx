import React, { useState } from 'react';
import { Spin } from 'antd';
import excel from 'xlsx';

function parseExcel(file: File): Promise<string[][]> {
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

export default function ExcelInput(props: {
  onDataInput: (data: string[][]) => Promise<void>;
}): React.ReactElement {
  const [loading, setLoading] = useState(false);
  const handleFile = (file: File) => {
    setLoading(true);
    parseExcel(file).then(async (excelData) => {
      await props.onDataInput(excelData);
      setLoading(false);
    });
  };

  return loading ? (
    <Spin />
  ) : (
    <input
      type="file"
      accept=".xls,.xlsx"
      onChange={(event) => {
        const { files } = event.target;
        if (files && files[0]) handleFile(files[0]);
        // eslint-disable-next-line no-param-reassign
        event.target.value = '';
      }}
    />
  );
}
