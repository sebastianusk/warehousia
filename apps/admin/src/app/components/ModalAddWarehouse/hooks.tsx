import { useState, Dispatch, SetStateAction } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_WAREHOUSE, GET_WAREHOUSES } from '../../graph';

interface ModalAddWarehouseState {
  confirmLoading: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onInputId: (e: any) => void;
  onInputName: (e: any) => void;
  featureOptions: {
    label: string;
    value: string;
  }[];
  onChangeFeatures: (e: any) => void;
}

export default function useModalAddWarehouseHooks(
  setVisible: Dispatch<SetStateAction<boolean>>
): ModalAddWarehouseState {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [addWarehouse, payloadId] = useMutation(ADD_WAREHOUSE, {
    onCompleted(data) {
      setConfirmLoading(false);
      setVisible(false);
    },
  });

  const handleOk = () => {
    setConfirmLoading(true);
    const formData = {
      id,
      name,
      features: selectedFeatures,
    };
    addWarehouse({
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

  const onInputId = (e: any) => {
    setId(e.target.value);
  };
  const onInputName = (e: any) => {
    setName(e.target.value);
  };

  return {
    confirmLoading,
    handleOk,
    handleCancel,
    onInputId,
    onInputName,
    featureOptions,
    onChangeFeatures,
  };
}
