import { useState } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { message } from 'antd';
import { ADD_PREPARATION, GET_OUTBOUNDS, GET_SHOPS } from 'app/graph';
import createPreparingXlsx from 'app/lib/xlsx/preparingXlsx';

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
  | [];

type DataOutbounds =
  | {
      shopId: string;
      products: DataSource;
    }[]
  | [];

export default function usePreparingHooks(): PreparingState {
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [shopsOption, setShopsOption] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);
  const [dataOutbounds, setDataOutbounds] = useState<DataOutbounds>([]);
  const [dataSource, setDataSource] = useState<DataSource>([]);
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
      if (response?.outbounds.length > 0) {
        const newData = response.outbounds.map((datum: any) => ({
          productId: datum.productId,
          actual: datum.amount,
        }));
        setDataOutbounds((prev: any) => [
          ...prev,
          {
            shopId: response.outbounds[0].shopId,
            products: newData,
          },
        ]);
        setDataSource((prev: any) => [...prev, ...newData]);
      }
    },
    fetchPolicy: 'no-cache',
  });

  const onSelectWarehouse = (warehouseId: string) => {
    setDataOutbounds([]);
    setDataSource([]);
    setSelectedShops([]);
    setSelectedWarehouse(warehouseId);
  };

  const onChangeSelectShops = (shopIds: any) => {
    setSelectedShops(shopIds);
    setDataSource([]);
    shopIds.forEach((shopId: any) => {
      const index = dataOutbounds.findIndex((el) => el.shopId === shopId);
      if (index > -1) {
        setDataSource((prev: any) => [
          ...prev,
          ...dataOutbounds[index].products,
        ]);
      } else {
        getOutbounds({
          variables: {
            warehouseId: selectedWarehouse,
            shopId,
          },
        });
      }
    });
  };

  const onSubmit = () => {
    addPreparation({
      variables: {
        warehouseId: selectedWarehouse,
        shopId: selectedShops,
      },
    }).then((resp) => {
      if (!resp.errors) {
        createPreparingXlsx(
          dataSource,
          resp.data.addPreparation.id,
          selectedWarehouse,
          selectedShops
        );
        message.info('Successfully create Preparation');

        setDataOutbounds([]);
        setDataSource([]);
        setSelectedShops([]);
      } else {
        console.log(resp.errors);
      }
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
