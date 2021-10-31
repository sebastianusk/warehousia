import React, { useState, Dispatch, SetStateAction } from 'react';

interface WarehouseListState {
  handleEdit(dataToEdit: any): void;
  handleDelete(): boolean;
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

  return {
    handleEdit,
    handleDelete,
    showModalEdit,
    setShowModalEdit,
    dataToBeEdited,
  };
}
