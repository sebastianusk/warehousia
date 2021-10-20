import { useEffect, useState } from 'react';
import {
  useMutation,
  useQuery,
  useLazyQuery,
  useApolloClient,
} from '@apollo/client';
import { message } from 'antd';

import { ADD_PREPARATION, GET_OUTBOUNDS, GET_SHOPS } from '../../graph';

interface PreparingState {
  handleMenuClick: (e: { key: React.SetStateAction<string> }) => void;
  onChangeVisibleWHMenu: () => void;
  showDropDown: boolean;
  selectedWarehouse: string;
  shopsOption:
    | {
        label: string;
        value: string;
      }[]
    | [];
  onChangeSelectShops(e: any): void;
  selectedShops: string[];
  onSubmit(): void;
  loading: boolean;
  setDefaultWarehouse(whList: any): string;
  dataSource: DataSource;
}

type Outbounds = {
  items: {
    productId: string;
    actual: number;
  }[];
};

export type DataSource = Outbounds | undefined;

export default function usePreparingHooks(): PreparingState {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [shopsOption, setShopsOption] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);
  const [dataSource, setDataSource] = useState<any>();
  const [addPreparation, { loading }] = useMutation(ADD_PREPARATION);
  const client = useApolloClient();

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
      if (response?.outbounds?.data.length > 0) {
        const newData = response.outbounds.data.map((datum: any) => ({
          productId: datum.productId,
          actual: datum.amount,
        }));
        setDataSource((prev: any) => [...prev, newData]);
      }
    },
  });

  useEffect(() => {
    client.refetchQueries({
      include: ['shops'],
    });
  }, [client, selectedWarehouse]);

  const onChangeVisibleWHMenu = () => {
    setShowDropDown(!showDropDown);
  };

  const handleMenuClick = (e: { key: React.SetStateAction<string> }) => {
    setSelectedShops([]);
    setSelectedWarehouse(e.key);
    setShowDropDown(false);
    setDataSource([]);
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

  const setDefaultWarehouse = (whList: any) => {
    if (whList.length > 0) {
      setSelectedWarehouse(whList[0]);
      return whList[0];
    }
    message.error('you dont have any warehouse assigned');
    return 'No Warehouse';
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
    handleMenuClick,
    onChangeVisibleWHMenu,
    showDropDown,
    selectedWarehouse,
    shopsOption,
    onChangeSelectShops,
    selectedShops,
    onSubmit,
    loading,
    setDefaultWarehouse,
    dataSource,
  };
}
