import { ApolloError, useQuery } from '@apollo/client';
import { GET_WAREHOUSES } from 'app/graph';
import { Dispatch, SetStateAction, useState } from 'react';

export interface WarehouseItem {
  id: string;
  name: string;
  active: boolean;
  features: string[];
}

interface SuperAdminWarehouseState {
  data: WarehouseItem[];
  loading: boolean;
  error: ApolloError | undefined;
  showModalAdd: boolean;
  setShowModalAdd: Dispatch<SetStateAction<boolean>>;
  setQuery: (query: string) => void;
  editData: WarehouseItem | undefined;
  setEditData: (item: WarehouseItem | undefined) => void;
}

export default function useSuperAdminWarehouseHooks(): SuperAdminWarehouseState {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const { data, loading, error, refetch } = useQuery(GET_WAREHOUSES);
  const [editData, setEditData] = useState<WarehouseItem | undefined>();
  const setQuery = (query: string) => refetch({ query });
  return {
    data: data?.warehouses,
    loading,
    error,
    showModalAdd,
    setShowModalAdd,
    setQuery,
    editData,
    setEditData,
  };
}
