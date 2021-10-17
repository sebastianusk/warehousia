import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { message } from 'antd';
import { ADD_INBOUND } from '../../graph';

interface InboundState {
  handleMenuClick: (e: { key: React.SetStateAction<string> }) => void;
  handleVisibleChange: () => void;
  showDropDown: boolean;
  selectedWarehouse: string;
  dataList: DataList;
  setDataList: React.Dispatch<React.SetStateAction<DataList>>;
  onSubmit(): void;
  loading: boolean;
  onAdd(data: Data): void;
  setDefaultWarehouse(whList: any): string;
}

export type DataList = Data[] | [];

type Data = {
  id: string;
  name: string;
  amount: number;
};

export default function useInboundHooks(): InboundState {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [dataList, setDataList] = useState<DataList>([]);
  const [addInbound, { loading }] = useMutation(ADD_INBOUND);

  const handleVisibleChange = () => {
    setShowDropDown(!showDropDown);
  };

  const handleMenuClick = (e: { key: React.SetStateAction<string> }) => {
    setSelectedWarehouse(e.key);
    setShowDropDown(false);
  };

  const onAdd = (data: Data) => {
    setDataList((prev) => [...prev, data]);
  };

  const setDefaultWarehouse = (whList: any) => {
    if (whList.length > 0) {
      setSelectedWarehouse(whList[0]);
      return whList[0];
    }
    message.error('you dont have any warehouse assigned');
    return 'No Warehouse';
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
    });
  };

  return {
    handleMenuClick,
    handleVisibleChange,
    showDropDown,
    selectedWarehouse,
    dataList,
    setDataList,
    onSubmit,
    loading,
    onAdd,
    setDefaultWarehouse,
  };
}
