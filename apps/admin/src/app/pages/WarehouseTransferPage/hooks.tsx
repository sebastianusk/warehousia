import {useMutation} from '@apollo/client';
import {ADD_TRANSFER} from 'app/graph';
import { useState } from 'react';

interface TransferPageState {
  warehouseFrom: string;
  setWarehouseFrom: (id: string) => void;
  warehouseTo: string;
  setWarehouseTo: (id: string) => void;
  dataList: { id: string; name: string; amount: number }[];
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
  onAdd: (data: Data) => void;
  error: { id: string }[];
  setError: (data: { id: string }[]) => void;
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
  const [error, setError] = useState<{ id: string }[]>([]);
  const [dataList, setData] = useState<Data[]>([]);

  const [submitTransfer, { loading }] = useMutation(ADD_TRANSFER);

  const onSubmit = () => {
    submitTransfer({
      variables: {
        warehouseId: warehouseFrom,
        destinationId: warehouseTo,
        items: dataList.map(({ id, amount }) => ({ id, amount })),
      },
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
