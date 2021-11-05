import { useState, Dispatch, SetStateAction } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_ADMIN, GET_ADMINS, GET_WAREHOUSES } from '../../graph';

interface ModalAddUserState {
  confirmLoading: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  formData: {
    username: string;
    password: string;
    role: string;
    warehouse: string[];
  };
  onChangeUsername: (e: any) => void;
  onChangePassword: (e: any) => void;
  onChangeRole: (e: any) => void;
  onChangeWarehouses: (e: any) => void;
  loadingDataWarehouses: boolean;
  warehousesOptions: WarehousesOptions;
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

export default function useModalAddUserHooks(
  setVisible: Dispatch<SetStateAction<boolean>>
): ModalAddUserState {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'ADMIN',
    warehouse: [''],
  });

  const [warehousesOptions, setWarehousesOptions] = useState<WarehousesOptions>(
    []
  );

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      role: 'ADMIN',
      warehouse: [''],
    });
  };

  const { loading: loadingDataWarehouses } = useQuery(GET_WAREHOUSES, {
    onCompleted(dataWarehouses) {
      const temp: WarehousesOptions = [];
      dataWarehouses.warehouses.map((warehouse: WarehouseType) =>
        temp.push({
          label: warehouse.name,
          value: warehouse.id,
        })
      );
      setWarehousesOptions(temp);
    },
  });

  const [addAdmin, createdUsername] = useMutation(ADD_ADMIN, {
    onCompleted(data) {
      resetForm();
      setConfirmLoading(false);
      setVisible(false);
    },
  });

  const handleOk = () => {
    setConfirmLoading(true);
    addAdmin({
      variables: { input: formData },
      refetchQueries: [
        {
          query: GET_ADMINS,
        },
      ],
    });
  };

  const handleCancel = () => {
    resetForm();
    setVisible(false);
  };

  const onChangeUsername = (e: any) => {
    setFormData({ ...formData, username: e.target.value });
  };

  const onChangePassword = (e: any) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const onChangeRole = (e: any) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const onChangeWarehouses = (e: any) => {
    setFormData({ ...formData, warehouse: e });
  };

  return {
    confirmLoading,
    handleOk,
    handleCancel,
    formData,
    onChangeUsername,
    onChangePassword,
    onChangeRole,
    onChangeWarehouses,
    loadingDataWarehouses,
    warehousesOptions,
  };
}
