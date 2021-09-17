import React, { useState, Dispatch, SetStateAction } from 'react';
import { useQuery, ApolloError } from '@apollo/client';
import { GET_ADMINS } from '../../graph';

interface UsersManagerState {
  showModalAdd: boolean;
  setShowModalAdd: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  error: ApolloError | undefined;
  data: UsersListType;
}

type UsersListType = {
  username: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  warehouses: string[];
  active: boolean;
}[];

export default function useUsersManagerHooks(): UsersManagerState {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const { loading, error, data } = useQuery(GET_ADMINS, {
    variables: {
      query: '',
      pagination: {
        offset: 0,
        limit: 10,
      },
    },
  });

  return {
    showModalAdd,
    setShowModalAdd,
    loading,
    error,
    data: data?.admins?.data,
  };
}
