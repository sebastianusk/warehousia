import { useState, Dispatch, SetStateAction } from 'react';
import { useMutation, ApolloError, useApolloClient } from '@apollo/client';
import { FormInstance, useForm } from 'antd/lib/form/Form';
import { ADD_PRODUCTS } from '../../graph/index';

interface ModalAddProductState {
  form: FormInstance;
  error: ApolloError | undefined;
  loading: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export default function useModalAddProductHooks(
  setVisible: Dispatch<SetStateAction<boolean>>
): ModalAddProductState {
  const [form] = useForm();
  const client = useApolloClient();
  const [addProducts, { loading, error }] = useMutation(ADD_PRODUCTS, {
    onCompleted() {
      form.resetFields();
      setVisible(false);
      client.refetchQueries({
        include: ['products'],
      });
    },
  });
  const handleOk = () => {
    const { id, name, price } = form.getFieldsValue();
    addProducts({
      variables: { input: [{ id, name, price: parseInt(price, 10) }] },
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return {
    form,
    error,
    loading,
    handleOk,
    handleCancel,
  };
}
