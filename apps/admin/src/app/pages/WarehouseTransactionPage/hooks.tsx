import React, { useContext, useEffect, useState } from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { message, notification, Table } from 'antd';

import createTransactionXlsx from 'app/lib/xlsx/transactionXlsx';
import { ADD_TRANSACTION, GET_PREPARATION, GET_PRODUCT_STOCK, GET_TRANSACTIONS } from 'app/graph';
import { GlobalContext } from 'app/components/GlobalState';
import useTransactionXslxHooks from 'app/lib/xlsx/transactionXlsxHooks';

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
  dataSource: DataSource;
  selectedPrep: Preparation | undefined;
  onSelectPreparation: (id: string) => void;
  loading: boolean;
  onSubmit(): void;
}

export type DataSource = Preparation[] | [];

export default function useTransactionHooks(): TransactionState {
  const { warehouse } = useContext(GlobalContext);
  const [dataSource, setDataSource] = useState<DataSource>([]);
  const [selectedPrep, setSelectedPrep] = useState<Preparation>();
  const [addTransaction, { loading }] = useMutation(ADD_TRANSACTION);

  const { refetch } = useQuery(GET_PREPARATION, {
    variables: {
      warehouseId: warehouse.selectedWarehouse,
    },
    onCompleted(response) {
      if (response?.preparations?.data.length > 0) {
        setDataSource(response.preparations.data);
      }
    },
  });

  useEffect(() => {
    refetch({
      warehouseId: warehouse.selectedWarehouse,
    });
  }, [refetch, warehouse.selectedWarehouse]);

  const onSelectPreparation = (e: string) => {
    dataSource.forEach((datum) => {
      if (datum?.id === e) {
        setSelectedPrep({ ...datum });
      }
    });
  };

  const { buildTransactionXlsx } = useTransactionXslxHooks();
  const client = useApolloClient();

  const onSubmit = () => {
    addTransaction({
      variables: {
        preparationId: selectedPrep?.id,
      },
    }).then((resp) => {
      if (!resp.errors) {
        buildTransactionXlsx(resp.data.addTransaction);
        message.info('Successfully create Transaction');
        if (resp.data.addTransaction.failed.length !== 0) {
          const columns = [
            {
              title: 'Product ID',
              dataIndex: 'productId',
              key: 'productId',
            },
            {
              title: 'Amount',
              dataIndex: 'amount',
              key: 'amount',
            },
          ];
          const description = (
            <Table
              dataSource={resp.data.addTransaction.failed}
              columns={columns}
              pagination={false}
            />
          );
          notification.info({
            message: `Failed Items`,
            description,
            placement: 'bottomRight',
            duration: 7,
          });
        }
        refetch({
          warehouseId: warehouse.selectedWarehouse,
        });
        client.refetchQueries({ include: [GET_TRANSACTIONS] });
        setDataSource([]);
        setSelectedPrep(undefined);
      } else {
        console.log(resp.errors);
      }
    });
  };

  return {
    selectedWarehouse: warehouse.selectedWarehouse,
    dataSource,
    selectedPrep,
    onSelectPreparation,
    onSubmit,
    loading,
  };
}
