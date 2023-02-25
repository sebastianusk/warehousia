import { useMutation } from '@apollo/client';
import { message } from 'antd';
import { GlobalContext, Data, DataList } from 'app/components/GlobalState';
import { ADD_TRANSFER } from 'app/graph';
import checkDupeData from 'app/helper/checkDupeData';
import { useContext, useState } from 'react';

interface TransferPageState {
  warehouseFrom: string;
  warehouseTo: string;
  transfer: {
    data: DataList;
    set: React.Dispatch<React.SetStateAction<DataList>>;
  };
  onAdd: (data: Data) => void;
  error: { id: string; message: string }[];
  setError: (data: { id: string; message: string }[]) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function useTranserPageHooks(): TransferPageState {
  const { warehouse, transfer } = useContext(GlobalContext);
  const [error, setError] = useState<{ id: string; message: string }[]>([]);
  const [submitTransfer, { loading }] = useMutation(ADD_TRANSFER);

  const onSubmit = () => {
    submitTransfer({
      variables: {
        warehouseId: warehouse.selectedWarehouse,
        destinationId: warehouse.selectedWarehouseTo,
        items: transfer.data.map((datum: Data) => ({
          productId: datum.id,
          amount: datum.amount,
        })),
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
        transfer.set([]);
        message.info('Success transfer');
      }
    });
  };

  const onAdd = (newData: Data) => {
    transfer.set((prev: DataList) => checkDupeData(newData, prev));
  };

  return {
    warehouseFrom: warehouse.selectedWarehouse,
    warehouseTo: warehouse.selectedWarehouseTo,
    transfer,
    onAdd,
    error,
    setError,
    onSubmit,
    loading,
  };
}
