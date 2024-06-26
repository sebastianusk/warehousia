import React, { Dispatch, SetStateAction, useState } from 'react';

type UserData = {
  username: string;
  password?: string;
  role: 'ADMIN' | 'SUPER_ADMIN' | 'ADMIN_MANAGER';
  warehouses: string[];
  active: boolean;
};

interface UsersListState {
  onClickEdit: (userData: UserData) => void;
  showModalEdit: boolean;
  setShowModalEdit: Dispatch<SetStateAction<boolean>>;
  dataToEdit: UserData;
}

export default function useUsersListHook(): UsersListState {
  const [dataToEdit, setDataToEdit] = useState<UserData>({
    username: '',
    role: 'ADMIN',
    warehouses: [''],
    active: true,
  });
  const [showModalEdit, setShowModalEdit] = useState(false);

  const onClickEdit = (props: UserData) => {
    setDataToEdit({
      username: props.username,
      role: props.role,
      warehouses: props.warehouses,
      active: props.active,
    });
    setShowModalEdit(true);
  };

  return {
    onClickEdit,
    showModalEdit,
    setShowModalEdit,
    dataToEdit,
  };
}
