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
  };
}
