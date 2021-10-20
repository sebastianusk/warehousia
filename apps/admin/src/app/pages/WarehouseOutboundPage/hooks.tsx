import { useState } from 'react';
import { ADD_OUTBOUND } from 'app/graph';
import { useMutation } from '@apollo/client';

interface OutboundState {
  setSelectedWarehouse: (warehouseId: string) => void;
  setSelectedShop: (shopId: string) => void;
  onAdd: (data: Data) => void;
  onSubmit(): void;
  loading: boolean;
  dataList: DataList;
  setDataList: React.Dispatch<React.SetStateAction<DataList>>;
}

export type DataList = Data[] | [];

type Data = {
  id: string;
  name: string;
  amount: number;
};

export default function useOutboundHooks(): OutboundState {
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedShop, setSelectedShop] = useState('');
  const [dataList, setDataList] = useState<DataList>([]);
  const [addOutbound, { loading }] = useMutation(ADD_OUTBOUND);

  const onAdd = (data: Data) => {
    setDataList((prev) => [...prev, data]);
  };

  const onSubmit = () => {
    const dataSubmit = dataList.map((datum) => ({
      productId: datum.id,
      amount: datum.amount,
    }));
    addOutbound({
      variables: {
        warehouseId: selectedWarehouse,
        shopId: selectedShop,
        items: dataSubmit,
      },
    });
  };

  return {
    setSelectedWarehouse,
    setSelectedShop,
    onAdd,
    onSubmit,
    loading,
    dataList,
    setDataList,
  };
}
