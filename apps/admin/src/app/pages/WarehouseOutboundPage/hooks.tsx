import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { message } from 'antd';
import { ADD_OUTBOUND } from 'app/graph';

interface OutboundState {
  selectedShop: string;
  selectedWarehouse: string;
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
    }).then((resp) => {
      if (!resp.errors) {
        setDataList([]);
        message.info('Successfully upload inbounds');
      } else {
        console.log(resp.errors);
      }
    });
  };

  return {
    selectedWarehouse,
    selectedShop,
    setSelectedWarehouse,
    setSelectedShop,
    onAdd,
    onSubmit,
    loading,
    dataList,
    setDataList,
  };
}
