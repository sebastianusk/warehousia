import { Dispatch, SetStateAction, useState } from 'react';
import { ShopData } from '../ShopsManager/Types';

interface UsersListState {
  onClickEdit: (shopData: ShopData) => void;
  showModalEdit: boolean;
  setShowModalEdit: Dispatch<SetStateAction<boolean>>;
  dataToEdit: ShopData;
}

export default function useUsersListHook(): UsersListState {
  const [dataToEdit, setDataToEdit] = useState<ShopData>({
    id: '',
    name: '',
    active: false,
  });
  const [showModalEdit, setShowModalEdit] = useState(false);

  const onClickEdit = (props: ShopData) => {
    setDataToEdit({
      id: props.id,
      name: props.name,
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
