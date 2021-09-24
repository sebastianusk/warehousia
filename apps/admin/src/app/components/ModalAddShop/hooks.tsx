import { useState, Dispatch, SetStateAction } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_SHOP, GET_SHOPS } from '../../graph';

interface ModalAddShopState {
  confirmLoading: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  formData: {
    id: string;
    name: string;
  };
  onChangeName: (e: any) => void;
  onChangeId: (e: any) => void;
}

export default function useModalAddShopHooks(
  setVisible: Dispatch<SetStateAction<boolean>>
): ModalAddShopState {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
  });

  const [addShop] = useMutation(ADD_SHOP, {
    onCompleted() {
      setFormData({
        id: '',
        name: '',
      });
      setConfirmLoading(false);
      setVisible(false);
    },
  });

  const handleOk = () => {
    setConfirmLoading(true);
    addShop({
      variables: { input: formData },
      refetchQueries: [
        {
          query: GET_SHOPS,
          variables: {
            query: '',
            pagination: {
              offset: 0,
              limit: 10,
            },
          },
        },
      ],
    });
  };

  const handleCancel = () => {
    setFormData({
      id: '',
      name: '',
    });
    setVisible(false);
  };

  const onChangeName = (e: any) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const onChangeId = (e: any) => {
    setFormData({ ...formData, id: e.target.value });
  };

  return {
    confirmLoading,
    handleOk,
    handleCancel,
    formData,
    onChangeName,
    onChangeId,
  };
}
