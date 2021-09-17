import { useQuery } from '@apollo/client';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { GET_WAREHOUSES } from '../../graph';

interface WarehouseListState {
  loading: boolean;
  data: WarehouseListType;
  handleEdit(data: any): void;
  handleDelete(): boolean;
  handleRowClick(
    e: React.MouseEvent<HTMLElement>,
    rowIndex: any,
    record: any
  ): boolean;
  showModalEdit: boolean;
  setShowModalEdit: Dispatch<SetStateAction<boolean>>;
  dataToBeEdited: any;
}

type WarehouseListType = {
  id: string;
  name: string;
  active: boolean;
  features: string[];
}[];

export default function useWarehouseTable(): WarehouseListState {
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [dataToBeEdited, setDataToBeEdited] = useState<any>({});
  const { loading, error, data } = useQuery(GET_WAREHOUSES, {
    variables: {
      query: '',
      pagination: {
        offset: 0,
        limit: 10,
      },
    },
  });

  const handleEdit = (data: any) => {
    setDataToBeEdited(data);
    setShowModalEdit(true);
  };

  const handleDelete = () => true;

  const handleRowClick = (
    e: React.MouseEvent<HTMLElement>,
    rowIndex: any,
    record: any
  ) => {
    // eslint-disable-next-line no-console
    console.log(record);
    return true;
  };

  return {
    loading,
    data: data?.warehouses?.data,
    handleEdit,
    handleDelete,
    handleRowClick,
    showModalEdit,
    setShowModalEdit,
    dataToBeEdited,
  };
}
