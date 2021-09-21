import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_ADMIN, GET_ADMINS, GET_WAREHOUSES } from '../../graph';
type UserData = {
  username: string;
  password?: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  warehouses: string[];
  active: boolean;
};

interface ModalEditUserState {
  confirmLoading: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  formData: UserData;
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

export default function useModalEditUserHooks(
  setVisible: Dispatch<SetStateAction<boolean>>,
  userData: UserData
): ModalEditUserState {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState(userData);

  const [warehousesOptions, setWarehousesOptions] = useState<WarehousesOptions>(
    []
  );

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const { loading: loadingDataWarehouses } = useQuery(GET_WAREHOUSES, {
    variables: {
      query: '',
      pagination: {
        offset: 0,
        limit: 10,
      },
    },
    onCompleted(dataWarehouses) {
      const temp: WarehousesOptions = [];
      dataWarehouses.warehouses?.data.map((warehouse: WarehouseType) =>
        temp.push({
          label: warehouse.name,
          value: warehouse.id,
        })
      );
      setWarehousesOptions(temp);
    },
  });

  const [editAdmin, editedUsername] = useMutation(EDIT_ADMIN, {
    onCompleted(data) {
      setConfirmLoading(false);
      setVisible(false);
    },
  });

  const handleOk = () => {
    setConfirmLoading(true);
    editAdmin({
      variables: { input: formData },
      refetchQueries: [
        {
          query: GET_ADMINS,
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
    setFormData({ ...formData, warehouses: e });
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
