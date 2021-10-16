import { useApolloClient, useMutation } from '@apollo/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { ADD_PRODUCTS } from '../../graph';

export interface ProductData {
  id: string;
  name: string;
}

interface ModalAddProductBulkState {
  handleFile(data: string[][]): void;
  data: ProductData[];
  setData: (excel: ProductData[]) => void;
  uploadData(): void;
  loading: boolean;
}

export default function useModalAddProductBulkHooks(
  setVisible: Dispatch<SetStateAction<boolean>>
): ModalAddProductBulkState {
  const [data, setData] = useState<ProductData[]>([]);
  const handleFile = (excel: string[][]) => {
    const newData = excel.map((item) => ({
      id: item[0],
      name: item[1],
    }));
    setData(newData);
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
    uploadData,
    loading,
  };
}
