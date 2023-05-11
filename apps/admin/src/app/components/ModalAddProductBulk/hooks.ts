import { useApolloClient, useMutation } from '@apollo/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { ADD_PRODUCTS } from '../../graph';

export interface ProductData {
  id: string;
  name: string;
  price: string;
}

interface ModalAddProductBulkState {
  handleFile(data: string[][]): Promise<void>;
  data: ProductData[];
  setData: (excel: ProductData[]) => void;
  uploadData(): void;
  loading: boolean;
}

export default function useModalAddProductBulkHooks(
  onCompleteBulkUpload: () => void
): ModalAddProductBulkState {
  const [data, setData] = useState<ProductData[]>([]);
  const handleFile = async (excel: string[][]) => {
    setData([]);
    const newData = excel.map((item) => ({
      id: item[0],
      name: item[1],
      price: item[2],
    }));
    setData(newData);
  };

  const client = useApolloClient();
  const [addProducts, { loading }] = useMutation(ADD_PRODUCTS, {
    onCompleted() {
      onCompleteBulkUpload();
      client.refetchQueries({
        include: ['products'],
      });
    },
  });

  const uploadData = () => {
    addProducts({
      variables: {
        input: data.map(({ id, name, price }) => ({
          id,
          name,
          price: parseInt(price, 10),
        })),
      },
    });
  };
  return {
    data,
    setData,
    handleFile,
    uploadData,
    loading,
  };
}
