import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { message } from 'antd';
import { ADD_OUTBOUND } from 'app/graph';
import { GlobalContext, Data, DataList } from 'app/components/GlobalState';
import checkDupeData from 'app/helper/checkDupeData';

interface OutboundState {
  selectedWarehouse: string;
  error: { id: string }[];
  setError: (data: { id: string }[]) => void;
  selectedShop: string;
  setSelectedShop: (shopId: string) => void;
  onAdd: (data: Data) => void;
  onSubmit(): void;
  loading: boolean;
  outbound: {
    data: DataList;
    set: React.Dispatch<React.SetStateAction<DataList>>;
  };
}

export default function useOutboundHooks(): OutboundState {
  const [error, setError] = useState<{ id: string }[]>([]);
  const { warehouse, outbound } = useContext(GlobalContext);
  const [selectedShop, setSelectedShop] = useState('');
  const [addOutbound, { loading }] = useMutation(ADD_OUTBOUND);

  const onAdd = (data: Data) => {
    outbound.set((prev: DataList) => checkDupeData(data, prev));
  };

  const onSubmit = () => {
    const dataSubmit = outbound.data.map((datum: Data) => ({
      productId: datum.id,
      amount: datum.amount,
    }));
    addOutbound({
      variables: {
        warehouseId: warehouse.selectedWarehouse,
        shopId: selectedShop,
        items: dataSubmit,
      },
    }).then((resp) => {
      if (!resp.errors) {
        outbound.set([]);
        message.info('Successfully create Outbound');
      } else {
        console.log(resp.errors);
      }
    });
  };

  return {
    selectedWarehouse: warehouse.selectedWarehouse,
    error,
    setError,
    selectedShop,
    setSelectedShop,
    onAdd,
    onSubmit,
    loading,
    outbound,
  };
}
