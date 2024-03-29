import React, { useState, Dispatch, SetStateAction } from 'react';
import { useQuery, ApolloError } from '@apollo/client';
import { GET_WAREHOUSES } from '../../graph';

interface SuperAdminMenuState {
  showModalAdd: boolean;
  setShowModalAdd: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  error: ApolloError | undefined;
  data: WarehouseType[];
  onSearch: (val: string) => void;
}

type WarehouseType = {
  id?: string;
  name: string;
  active: boolean;
  features: string[];
};

export default function useSuperAdminMenuHooks(): SuperAdminMenuState {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const { loading, error, data } = useQuery(GET_WAREHOUSES);

  const onSearch = (val: any) => {
    // eslint-disable-next-line no-console
    console.log(val);
  };

  return {
    showModalAdd,
    setShowModalAdd,
    loading,
    error,
    data: data?.warehouses,
    onSearch,
  };
}
