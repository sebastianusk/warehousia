import { useMutation } from '@apollo/client';
import { FormInstance, useForm } from 'antd/lib/form/Form';
import { Dispatch, SetStateAction } from 'react';
import { ADD_WAREHOUSE, GET_WAREHOUSES } from '../../graph';

interface ModalAddWarehouseState {
  handleOk: () => void;
  form: FormInstance;
  loading: boolean;
}

export default function useModalAddWarehouseHooks(
  setVisible: Dispatch<SetStateAction<boolean>>
): ModalAddWarehouseState {
  const [form] = useForm();
  const [addWarehouse, { loading }] = useMutation(ADD_WAREHOUSE);

  const handleOk = () => {
    const values = form.getFieldsValue();
    addWarehouse({
      variables: { input: values },
      refetchQueries: [
        {
          query: GET_WAREHOUSES,
        },
      ],
    })
      .then(() => setVisible(false))
      .then(() => form.resetFields());
  };

  return {
    handleOk,
    form,
    loading,
  };
}
