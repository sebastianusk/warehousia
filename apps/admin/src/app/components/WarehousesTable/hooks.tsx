import React, { useState, Dispatch, SetStateAction } from 'react';

interface WarehouseListState {
  handleEdit(dataToEdit: any): void;
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

export default function useWarehouseTable(): WarehouseListState {
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [dataToBeEdited, setDataToBeEdited] = useState<any>({});

  const handleEdit = (dataToEdit: any) => {
    setDataToBeEdited(dataToEdit);
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
    handleEdit,
    handleDelete,
    handleRowClick,
    showModalEdit,
    setShowModalEdit,
    dataToBeEdited,
  };
}
