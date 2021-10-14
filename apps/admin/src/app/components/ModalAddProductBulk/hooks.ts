import { Dispatch, SetStateAction, useState } from 'react';
import parseExcel from '../../excel';

export interface ProductData {
  productName: string;
  productCode: string;
}

interface ModalAddProductBulkState {
  handleFile(file: File): void;
  loading: boolean;
  data: ProductData[];
}

export default function useModalAddProductBulkHooks(
  setVisible: Dispatch<SetStateAction<boolean>>
): ModalAddProductBulkState {
  const [data, setData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const handleFile = (file: File) => {
    setLoading(true);
    parseExcel(file).then((excelData) => {
      setData(
        excelData.map((item) => ({
          productCode: item[0],
          productName: item[1],
        }))
      );
      setLoading(false);
    });
  };
  return {
    data,
    handleFile,
    loading,
  };
}
