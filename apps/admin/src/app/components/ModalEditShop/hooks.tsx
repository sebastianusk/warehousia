import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_SHOP, GET_SHOPS } from '../../graph';
import { ShopData } from '../ShopsManager/Types';

interface ModalEditShopState {
  confirmLoading: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  formData: ShopData;
  onChangeName: (e: any) => void;
  onChangeActive: (e: any) => void;
}

export default function useModalEditShopHooks(
  setVisible: Dispatch<SetStateAction<boolean>>,
  shopData: ShopData
): ModalEditShopState {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState(shopData);

  useEffect(() => {
    setFormData(shopData);
  }, [shopData]);

  const [editShop] = useMutation(EDIT_SHOP, {
    onCompleted() {
      setConfirmLoading(false);
      setVisible(false);
    },
  });

  const handleOk = () => {
    setConfirmLoading(true);
    editShop({
      variables: { input: formData },
      refetchQueries: [
        {
          query: GET_SHOPS,
        },
      ],
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onChangeName = (e: any) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const onChangeActive = (e: any) => {
    setFormData({ ...formData, active: e });
  };

  return {
    confirmLoading,
    handleOk,
    handleCancel,
    formData,
    onChangeName,
    onChangeActive,
  };
}
