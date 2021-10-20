import { useMutation } from '@apollo/client';
import { message } from 'antd';
import { useState } from 'react';
import { ADD_INBOUND } from '../../graph';

interface InboundState {
  selectedWarehouse: string;
  setSelectedWarehouse: (warehouseId: string) => void;
  dataList: DataList;
  setDataList: React.Dispatch<React.SetStateAction<DataList>>;
  onSubmit(): void;
  loading: boolean;
  onAdd(data: Data): void;
}

export type DataList = Data[] | [];

type Data = {
  id: string;
  name: string;
  amount: number;
};

export default function useInboundHooks(): InboundState {
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [dataList, setDataList] = useState<DataList>([]);
  const [addInbound, { loading }] = useMutation(ADD_INBOUND);

  const onAdd = (data: Data) => {
    setDataList((prev) => [...prev, data]);
  };

  const onSubmit = () => {
    const dataSubmit = dataList.map((datum) => ({
      productId: datum.id,
      amount: datum.amount,
    }));
    addInbound({
      variables: {
        warehouseId: selectedWarehouse,
        items: dataSubmit,
      },
    }).then(() => {
      setDataList([]);
      message.info('Successfully upload inbounds');
    });
  };

  return {
    selectedWarehouse,
    setSelectedWarehouse,
    dataList,
    setDataList,
    onSubmit,
    loading,
    onAdd,
  };
}
