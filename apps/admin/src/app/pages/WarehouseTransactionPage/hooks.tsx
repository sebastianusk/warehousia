import { useEffect, useState } from 'react';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import { message } from 'antd';

import { ADD_TRANSACTION, GET_PREPARATION } from '../../graph';

type Preparation = {
  id: string;
  warehouseId: string;
  items: {
    productId: string;
    expected: number;
    actual: number;
  }[];
};

interface TransactionState {
  handleMenuClick: (e: { key: React.SetStateAction<string> }) => void;
  onChangeVisibleWHMenu: () => void;
  showDropDown: boolean;
  selectedWarehouse: string;
  onSubmit(): void;
  loading: boolean;
  setDefaultWarehouse(whList: any): string;
  prepIdList: string[];
  selectedPrep: Preparation | undefined;
  handleMenuPrepClick: (e: { key: React.SetStateAction<string> }) => void;
  onChangeVisiblePrepMenu: () => void;
}

export type DataSource = Preparation[] | [];

export default function useTransactionHooks(): TransactionState {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [showDropDownPrep, setShowDropDownPrep] = useState(false);
  const [prepIdList, setPrepIdList] = useState(['']);
  const [dataSource, setDataSource] = useState<DataSource>([]);
  const [selectedPrep, setSelectedPrep] = useState<Preparation | undefined>();
  const [addTransaction, { loading }] = useMutation(ADD_TRANSACTION);
  const client = useApolloClient();

  useQuery(GET_PREPARATION, {
    variables: {
      warehouseId: selectedWarehouse,
    },
    onCompleted(response) {
      if (response?.preparations?.data.length > 0) {
        const newData = response.preparation.data.map((datum: any) => datum.id);
        setDataSource(response.preparation.data);
        setPrepIdList(newData);
        setSelectedPrep(response.preparations.data[0]);
      }
    },
  });

  useEffect(() => {
    client.refetchQueries({
      include: ['preparations'],
    });
  }, [client, selectedWarehouse]);

  const onChangeVisibleWHMenu = () => {
    setShowDropDown(!showDropDown);
  };

  const onChangeVisiblePrepMenu = () => {
    setShowDropDownPrep(!showDropDownPrep);
  };

  const handleMenuClick = (e: { key: React.SetStateAction<string> }) => {
    setSelectedWarehouse(e.key);
    setShowDropDown(false);
  };

  const handleMenuPrepClick = (e: { key: React.SetStateAction<string> }) => {
    setShowDropDownPrep(false);
    dataSource.forEach((datum) => {
      if (datum.id === e.key) {
        setSelectedPrep({ ...datum });
      }
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
    addTransaction({
      variables: {
        preparationId: selectedPrep?.id,
      },
    });
  };

  return {
    handleMenuClick,
    onChangeVisibleWHMenu,
    showDropDown,
    selectedWarehouse,
    onSubmit,
    loading,
    setDefaultWarehouse,
    prepIdList,
    selectedPrep,
    handleMenuPrepClick,
    onChangeVisiblePrepMenu,
  };
}
