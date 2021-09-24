import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_WAREHOUSE, GET_WAREHOUSES } from '../../graph';

interface ModalEditWarehouseState {
  confirmLoading: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onInputName: (e: any) => void;
  onChangeActive: (e: any) => void;
  featureOptions: {
    label: string;
    value: string;
  }[];
  onChangeFeatures: (e: any) => void;
  formData: {
    id: string;
    name: string;
    active: boolean;
    features: string[];
  };
}

type ModalEditWarehouseProps = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  initialData: {
    id: string;
    name: string;
    active: boolean;
    features: string[];
  };
};
export default function useModalEditWarehouseHooks({
  setVisible,
  initialData,
}: ModalEditWarehouseProps): ModalEditWarehouseState {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [name, setName] = useState('');
  const [active, setActive] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState(['']);
  const [editWarehouse] = useMutation(EDIT_WAREHOUSE, {
    onCompleted() {
      setConfirmLoading(false);
      setVisible(false);
    },
  });

  useEffect(() => {
    setName(initialData.name);
    setActive(initialData.active);
    setSelectedFeatures(initialData.features);
  }, [initialData]);

  const handleOk = () => {
    setConfirmLoading(true);
    const formData = {
      id: initialData.id,
      name,
      features: selectedFeatures,
      active,
    };
    editWarehouse({
      variables: { input: formData },
      refetchQueries: [
        {
          query: GET_WAREHOUSES,
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

  const featureOptions = [
    { label: 'Outbound', value: 'OUTBOUND' },
    { label: 'Inbound', value: 'INBOUND' },
    { label: 'Transfer', value: 'TRANSFER' },
  ];

  const onChangeFeatures = (e: any) => {
    setSelectedFeatures(e);
  };

  const onChangeActive = (e: any) => {
    setActive(e);
  };

  const onInputName = (e: any) => {
    setName(e.target.value);
  };

  return {
    confirmLoading,
    handleOk,
    handleCancel,
    onInputName,
    featureOptions,
    onChangeFeatures,
    onChangeActive,
    formData: {
      id: initialData.id,
      name,
      features: selectedFeatures,
      active,
    },
  };
}
