import { ApolloError, useQuery } from '@apollo/client';
import { GET_ADMINS } from 'app/graph';
import { Dispatch, SetStateAction, useState } from 'react';
import _ from 'lodash';

export interface AdminItem {
  username: string;
  role: string;
  warehouses: string[];
  active: boolean;
}

interface SuperAdminState {
  data: AdminItem[];
  loading: boolean;
  error: ApolloError | undefined;
  showModalAdd: boolean;
  setShowModalAdd: Dispatch<SetStateAction<boolean>>;
  setQuery: (query: string) => void;
}

export default function useSuperAdminHooks(): SuperAdminState {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const { data, loading, error, refetch } = useQuery(GET_ADMINS);
  const setQuery = _.debounce((query: string) => {
    refetch({ query });
  }, 250);

  return {
    data: data?.admins,
    loading,
    error,
    showModalAdd,
    setShowModalAdd,
    setQuery,
  };
}
