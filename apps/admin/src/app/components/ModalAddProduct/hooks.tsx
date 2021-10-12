import { useState, Dispatch, SetStateAction } from 'react';
import { useMutation, ApolloError } from '@apollo/client';
import { ADD_PRODUCTS } from '../../graph/index';
import client from '../../config/client';

interface ModalAddProductState {
  error: ApolloError | undefined;
  loading: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onInputProductCode: (e: any) => void;
  onInputProductName: (e: any) => void;
}

export default function useModalAddProductHooks(
  setVisible: Dispatch<SetStateAction<boolean>>
): ModalAddProductState {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
  });
  const [addProducts, { loading, error }] = useMutation(ADD_PRODUCTS, {
    onCompleted() {
      setFormData({
        id: '',
        name: '',
      });
      setVisible(false);
      client.refetchQueries({
        include: ['products'],
      });
    },
  });
  const handleOk = () => {
    addProducts({
      variables: { input: formData },
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onInputProductCode = (e: any) => {
    setFormData({ ...formData, id: e.target.value });
  };
  const onInputProductName = (e: any) => {
    setFormData({ ...formData, name: e.target.value });
  };

  return {
    error,
    loading,
    handleOk,
    handleCancel,
    onInputProductCode,
    onInputProductName,
  };
}
