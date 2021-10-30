import { useState, Dispatch, SetStateAction } from 'react';
import { useQuery, ApolloError } from '@apollo/client';
import { GET_SHOPS } from '../../graph';
import { ShopData } from './Types';

interface ShopsManagerState {
  showModalAdd: boolean;
  setShowModalAdd: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  error: ApolloError | undefined;
  data: ShopData[];
}

export default function useShopsManagerHooks(): ShopsManagerState {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const { loading, error, data } = useQuery(GET_SHOPS, {
    onCompleted() {
      console.log(data);
    },
  });

  return {
    showModalAdd,
    setShowModalAdd,
    loading,
    error,
    data: data?.shops,
  };
}
