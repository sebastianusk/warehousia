import { useMutation } from '@apollo/client';
import { message } from 'antd';
import { ADD_TRANSFER } from 'app/graph';
import { useState } from 'react';

interface TransferPageState {
  warehouseFrom: string;
  setWarehouseFrom: (id: string) => void;
  warehouseTo: string;
  setWarehouseTo: (id: string) => void;
  dataList: { id: string; name: string; amount: number }[];
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
  onAdd: (data: Data) => void;
  error: { id: string; message: string }[];
  setError: (data: { id: string; message: string }[]) => void;
  onSubmit: () => void;
  loading: boolean;
}

type Data = {
  id: string;
  name: string;
  amount: number;
};

export default function useTranserPageHooks(): TransferPageState {
  const [warehouseFrom, setWarehouseFrom] = useState('');
  const [warehouseTo, setWarehouseTo] = useState('');
  const [error, setError] = useState<{ id: string; message: string }[]>([]);
  const [dataList, setData] = useState<Data[]>([]);
  const [submitTransfer, { loading }] = useMutation(ADD_TRANSFER);

  const onSubmit = () => {
    submitTransfer({
      variables: {
        warehouseId: warehouseFrom,
        destinationId: warehouseTo,
        items: dataList.map(({ id, amount }) => ({ productId: id, amount })),
      },
    }).then((data) => {
      if (data.errors?.length === 1 && data.errors[0].extensions) {
        setError(
          data?.errors[0].extensions.errors.map((item: any) => ({
            id: item.productId,
            message: `not enough, just has ${item.actual}`,
          }))
        );
      } else if (data.data) {
        setData([]);
        message.info('Success transfer');
      }
    });
  };

  const onAdd = (newData: Data) => {
    setData((prev) => [...prev, newData]);
  };

  return {
    warehouseFrom,
    setWarehouseFrom,
    warehouseTo,
    setWarehouseTo,
    dataList,
    setData,
    onAdd,
    error,
    setError,
    onSubmit,
    loading,
  };
}
