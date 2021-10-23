import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { message } from 'antd';

import createTransactionPdf from './Pdf';
import { ADD_TRANSACTION, GET_PREPARATION } from '../../graph';

type Preparation =
  | {
      id: string;
      warehouseId: string;
      createdAt: string;
      createdBy: string;
      items: {
        productId: string;
        expected: number;
        actual: number;
      }[];
    }
  | undefined;

interface TransactionState {
  selectedWarehouse: string;
  onSelectWarehouse: (warehouseId: string) => void;
  dataSource: DataSource;
  selectedPrep: Preparation | undefined;
  onSelectPreparation: (id: string) => void;
  loading: boolean;
  onSubmit(): void;
}

export type DataSource = Preparation[] | [];

export default function useTransactionHooks(): TransactionState {
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [dataSource, setDataSource] = useState<DataSource>([]);
  const [selectedPrep, setSelectedPrep] = useState<Preparation>();
  const [addTransaction, { loading }] = useMutation(ADD_TRANSACTION);

  const { refetch } = useQuery(GET_PREPARATION, {
    variables: {
      warehouseId: selectedWarehouse,
    },
    onCompleted(response) {
      if (response?.preparations?.data.length > 0) {
        setDataSource(response.preparations.data);
      }
    },
  });

  useEffect(() => {
    refetch({
      warehouseId: selectedWarehouse,
    });
  }, [refetch, selectedWarehouse]);

  const onSelectWarehouse = (warehouseId: string) => {
    setSelectedWarehouse(warehouseId);
  };

  const onSelectPreparation = (e: string) => {
    dataSource.forEach((datum) => {
      if (datum?.id === e) {
        setSelectedPrep({ ...datum });
      }
    });
  };

  const onSubmit = () => {
    addTransaction({
      variables: {
        preparationId: selectedPrep?.id,
      },
    }).then((resp) => {
      if (!resp.errors) {
        resp.data.addTransaction.data.forEach((datum: any) => {
          createTransactionPdf(datum);
        });
        message.info('Successfully create Transaction');

        setDataSource([]);
        setSelectedPrep(undefined);
      } else {
        console.log(resp.errors);
      }
    });
  };

  return {
    selectedWarehouse,
    onSelectWarehouse,
    dataSource,
    selectedPrep,
    onSelectPreparation,
    onSubmit,
    loading,
  };
}
