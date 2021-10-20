import { useState } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';

import { ADD_PREPARATION, GET_OUTBOUNDS, GET_SHOPS } from '../../graph';

interface PreparingState {
  onSelectWarehouse: (warehouseId: string) => void;
  selectedWarehouse: string;
  shopsOption:
    | {
        label: string;
        value: string;
      }[]
    | [];
  onChangeSelectShops(e: any): void;
  selectedShops: string[] | [];
  onSubmit(): void;
  loading: boolean;
  dataSource: DataSource;
}

type DataSource =
  | {
      productId: string;
      actual: number;
    }[]
  | undefined;

export default function usePreparingHooks(): PreparingState {
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [shopsOption, setShopsOption] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);
  const [dataSource, setDataSource] = useState<DataSource>();
  const [addPreparation, { loading }] = useMutation(ADD_PREPARATION);

  useQuery(GET_SHOPS, {
    variables: {
      pagination: {
        limit: 10,
        offset: 0,
      },
    },
    onCompleted: (response) => {
      if (response?.shops?.data.length > 0) {
        const newOptions = response.shops.data.map((datum: any) => ({
          label: datum.name,
          value: datum.id,
        }));
        setShopsOption(newOptions);
      }
    },
  });

  const [getOutbounds] = useLazyQuery(GET_OUTBOUNDS, {
    onCompleted(response) {
      console.log(response, 'ini dari oncompleteget');
      if (response?.outbounds?.data.length > 0) {
        const newData = response.outbounds.data.map((datum: any) => ({
          productId: datum.productId,
          actual: datum.amount,
        }));
        console.log(newData, 'newDataa');
        setDataSource((prev: any) => [...prev, ...newData]);
      }
    },
  });

  const onSelectWarehouse = (warehouseId: string) => {
    setDataSource([]);
    setSelectedShops([]);
    setSelectedWarehouse(warehouseId);
  };

  const onChangeSelectShops = (e: any) => {
    setSelectedShops(e);
    setDataSource([]);
    e.forEach((idShop: any) => {
      getOutbounds({
        variables: {
          warehouseId: selectedWarehouse,
          shopId: idShop,
          pagination: {
            limit: 10,
            offset: 0,
          },
        },
      });
    });
  };

  const onSubmit = () => {
    addPreparation({
      variables: {
        warehouseId: selectedWarehouse,
        shopId: selectedShops,
      },
    });
  };

  return {
    onSelectWarehouse,
    selectedWarehouse,
    shopsOption,
    onChangeSelectShops,
    selectedShops,
    onSubmit,
    loading,
    dataSource,
  };
}
