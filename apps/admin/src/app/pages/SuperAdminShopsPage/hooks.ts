import { ApolloError, useQuery } from '@apollo/client';
import { GET_SHOPS } from 'app/graph';
import { Dispatch, SetStateAction, useState } from 'react';

export interface ShopItem {
  id: string;
  name: string;
  active: boolean;
}

interface SuperAdminShopsState {
  data: ShopItem[];
  loading: boolean;
  error: ApolloError | undefined;
  showModalAdd: boolean;
  setShowModalAdd: Dispatch<SetStateAction<boolean>>;
  setQuery: (query: string) => void;
  editData: ShopItem | undefined;
  setEditData: (item: ShopItem | undefined) => void;
}

export default function useSuperAdminShopsHooks(): SuperAdminShopsState {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const { data, loading, error, refetch } = useQuery(GET_SHOPS);
  const [editData, setEditData] = useState<ShopItem | undefined>();
  const setQuery = (query: string) => refetch({ query });
  return {
    data: data?.shops,
    loading,
    error,
    showModalAdd,
    setShowModalAdd,
    setQuery,
    editData,
    setEditData,
  };
}
