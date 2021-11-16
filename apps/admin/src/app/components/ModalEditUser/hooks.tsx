import { useState, Dispatch, SetStateAction } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { message } from 'antd';
import { FormInstance, useForm } from 'antd/lib/form/Form';
import { EDIT_ADMIN, GET_ADMINS, GET_WAREHOUSES } from '../../graph';

interface ModalEditUserState {
  handleOk: (value: any) => void;
  handleCancel: () => void;
  loadingDataWarehouses: boolean;
  warehousesOptions: WarehousesOptions;
  form: FormInstance;
}

type WarehousesOptions = {
  label: string;
  value: string;
}[];

type WarehouseType = {
  id: string;
  name: string;
  active: boolean;
  features: string[];
};

export default function useModalEditUserHooks(
  setVisible: Dispatch<SetStateAction<boolean>>
): ModalEditUserState {
  const [form] = useForm();
  const [warehousesOptions, setWarehousesOptions] = useState<WarehousesOptions>(
    []
  );

  const { loading: loadingDataWarehouses } = useQuery(GET_WAREHOUSES, {
    onCompleted(dataWarehouses) {
      const temp: WarehousesOptions = [];
      dataWarehouses.warehouses.forEach((warehouse: WarehouseType) => {
        if (warehouse.active) {
          temp.push({
            label: warehouse.name,
            value: warehouse.id,
          });
        }
      });
      setWarehousesOptions(temp);
    },
  });

  const [editAdmin] = useMutation(EDIT_ADMIN, {
    onCompleted() {
      message.info('Success edit user');
      setVisible(false);
    },
  });

  const handleOk = (value: any) => {
    let input = value;
    if (!value.password) {
      const { password, ...noPassword } = value;
      input = noPassword;
    }
    editAdmin({
      variables: { input },
      refetchQueries: [
        {
          query: GET_ADMINS,
        },
      ],
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return {
    handleOk,
    handleCancel,
    loadingDataWarehouses,
    warehousesOptions,
    form,
  };
}
