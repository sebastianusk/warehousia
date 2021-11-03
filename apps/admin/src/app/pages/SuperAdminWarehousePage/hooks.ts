import { ApolloError, useQuery } from '@apollo/client';
import { GET_WAREHOUSES } from 'app/graph';
import { useState } from 'react';

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
  editData: WarehouseItem | undefined;
  setEditData: (item: WarehouseItem | undefined) => void;
}

export default function useSuperAdminWarehouseHooks(): SuperAdminWarehouseState {
  const { data, loading, error } = useQuery(GET_WAREHOUSES);
  const [editData, setEditData] = useState<WarehouseItem | undefined>();
  return {
    data: data?.warehouses,
    loading,
    error,
    editData,
    setEditData,
  };
}
