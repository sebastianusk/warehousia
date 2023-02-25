import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { message } from 'antd';
import { GlobalContext, Data, DataList } from 'app/components/GlobalState';
import { ADD_INBOUND } from 'app/graph';
import checkDupeData from 'app/helper/checkDupeData';

interface InboundState {
  selectedWarehouse: string;
  error: { id: string }[];
  setError: (data: { id: string }[]) => void;
  inbound: {
    data: DataList;
    set: React.Dispatch<React.SetStateAction<DataList>>;
  };
  onSubmit(): void;
  loading: boolean;
  onAdd(data: Data): void;
}

export default function useInboundHooks(): InboundState {
  const [error, setError] = useState<{ id: string }[]>([]);
  const [addInbound, { loading }] = useMutation(ADD_INBOUND);
  const { warehouse, inbound } = useContext(GlobalContext);

  const onAdd = (data: Data) => {
    inbound.set((prev: DataList) => checkDupeData(data, prev));
  };

  const onSubmit = () => {
    const dataSubmit = inbound.data.map((datum: Data) => ({
      productId: datum.id,
      amount: datum.amount,
    }));
    addInbound({
      variables: {
        warehouseId: warehouse.selectedWarehouse,
        items: dataSubmit,
      },
    }).then(() => {
      inbound.set([]);
      message.info('Successfully upload inbounds');
    });
  };

  return {
    selectedWarehouse: warehouse.selectedWarehouse,
    error,
    setError,
    inbound,
    onSubmit,
    loading,
    onAdd,
  };
}
