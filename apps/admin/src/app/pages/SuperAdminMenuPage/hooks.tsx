import React, { useState, Dispatch, SetStateAction } from 'react';
import { useQuery, ApolloError } from '@apollo/client';
import { GET_WAREHOUSES } from '../../graph';

interface SuperAdminMenuState {
  showModalAdd: boolean;
  setShowModalAdd: Dispatch<SetStateAction<boolean>>;
  showModalEdit: boolean;
  setShowModalEdit: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  error: ApolloError | undefined;
  data: WarehouseType[];
}

type WarehouseType = {
  name: string;
  active: boolean;
  features: string[];
};

export default function useSuperAdminMenuHooks(): SuperAdminMenuState {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const { loading, error, data } = useQuery(GET_WAREHOUSES, {
    variables: {
      query: '',
      pagination: '',
    },
  });

  return {
    showModalAdd,
    setShowModalAdd,
    showModalEdit,
    setShowModalEdit,
    loading,
    error,
    data,
  };
}
