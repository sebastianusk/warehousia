import { useApolloClient, useMutation } from '@apollo/client';
import { Dispatch, SetStateAction, useState } from 'react';
import parseExcel from '../../excel';
import { ADD_PRODUCTS } from '../../graph';

export interface ProductData {
  id: string;
  name: string;
}

interface ModalAddProductBulkState {
  handleFile(file: File): void;
  fileLoading: boolean;
  data: ProductData[];
  setData: (data: ProductData[]) => void;
  uploadData(): void;
  uploadLoading: boolean;
}

export default function useModalAddProductBulkHooks(
  setVisible: Dispatch<SetStateAction<boolean>>
): ModalAddProductBulkState {
  const [data, setData] = useState<ProductData[]>([]);
  const [fileLoading, setFileLoading] = useState(false);
  const handleFile = (file: File) => {
    setFileLoading(true);
    parseExcel(file).then((excelData) => {
      const newData = excelData.map((item) => ({
        id: item[0],
        name: item[1],
      }));
      setData(newData);
      setFileLoading(false);
    });
  };

  const client = useApolloClient();
  const [addProducts, { loading }] = useMutation(ADD_PRODUCTS, {
    onCompleted() {
      setVisible(false);
      client.refetchQueries({
        include: ['products'],
      });
    },
  });

  const uploadData = () => {
    addProducts({ variables: { input: data } });
  };
  return {
    data,
    setData,
    handleFile,
    fileLoading,
    uploadData,
    uploadLoading: loading,
  };
}
