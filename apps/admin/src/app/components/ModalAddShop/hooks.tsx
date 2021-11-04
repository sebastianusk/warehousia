import { Dispatch, SetStateAction } from 'react';
import { useMutation } from '@apollo/client';
import { FormInstance, useForm } from 'antd/lib/form/Form';
import { ADD_SHOP, GET_SHOPS } from '../../graph';

interface ModalAddShopState {
  form: FormInstance;
  handleOk: () => void;
  loading: boolean;
}

export default function useModalAddShopHooks(
  setVisible: Dispatch<SetStateAction<boolean>>
): ModalAddShopState {
  const [form] = useForm();
  const [addShop, { loading }] = useMutation(ADD_SHOP);

  const handleOk = () => {
    const values = form.getFieldsValue();
    addShop({
      variables: { input: values },
      refetchQueries: [
        {
          query: GET_SHOPS,
        },
      ],
    })
      .then(() => setVisible(false))
      .then(() => form.resetFields());
  };

  return {
    form,
    loading,
    handleOk,
  };
}
