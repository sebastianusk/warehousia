import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { message } from 'antd';
import { FormInstance, useForm } from 'antd/lib/form/Form';

import { ADD_MISSING, GET_PREPARATION } from 'app/graph';

type Preparation =
  | {
      id: string;
      warehouseId: string;
      items: {
        productId: string;
        expected: number;
        actual: number;
        prevMissed: number;
      }[];
    }
  | undefined;

interface MissingState {
  selectedWarehouse: string;
  onSelectWarehouse: (warehouseId: string) => void;
  dataSource: DataSource;
  selectedPrep: Preparation | undefined;
  onSelectPreparation: (id: string) => void;
  loading: boolean;
  onSubmit(val: { productId: string; expected: number; amount: number }): void;
  form: FormInstance;
  onProductSelect(val: any): void;
}

export type DataSource = Preparation[] | [];

export default function useMissingHooks(): MissingState {
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [dataSource, setDataSource] = useState<DataSource>([]);
  const [selectedPrep, setSelectedPrep] = useState<Preparation>();
  const [addMissing, { loading }] = useMutation(ADD_MISSING);
  const [form] = useForm();

  const onCompletedFetchPrep = (response: any) => {
    if (response?.preparations?.data.length > 0) {
      const newData = response.preparations.data.map((datum: any) => ({
        ...datum,
        items: datum.items.map((item: any) => ({
          ...item,
          prevMissed: item.expected - item.actual,
        })),
      }));
      setDataSource(newData);
      console.log('on completed retriggered lho');
      if (selectedPrep) {
        setSelectedPrep((prev) => {
          const a = newData.find(
            (el: { id: string | undefined }) => el.id === prev?.id
          );
          return a;
        });
      }
    }
  };

  const { refetch } = useQuery(GET_PREPARATION, {
    variables: {
      warehouseId: selectedWarehouse,
    },
    onCompleted: onCompletedFetchPrep,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    refetch({
      warehouseId: selectedWarehouse,
    });
  }, [refetch, selectedWarehouse]);

  const onSelectWarehouse = (warehouseId: string) => {
    setSelectedWarehouse(warehouseId);
  };

  const onSelectPreparation = (e: string) => {
    dataSource.forEach((datum) => {
      if (datum?.id === e) {
        setSelectedPrep({ ...datum });
      }
    });
  };

  const onSubmit = (val: {
    productId: string;
    expected: number;
    amount: number;
  }) => {
    addMissing({
      variables: {
        preparationId: selectedPrep?.id,
        productId: val.productId,
        amount: val.amount,
      },
    }).then((resp) => {
      if (!resp.errors) {
        message.info('Successfully update Missing Item');
        form.resetFields();
        refetch({
          warehouseId: selectedWarehouse,
        });
      } else {
        console.log(resp.errors);
      }
    });
  };

  const onProductSelect = (value: any) => {
    const selectedItem = selectedPrep?.items.find(
      (val) => val.productId === value
    );
    console.log(selectedItem, 'apa isinya');
    if (selectedItem) {
      form.setFieldsValue(selectedItem);
    }
  };

  return {
    selectedWarehouse,
    onSelectWarehouse,
    dataSource,
    selectedPrep,
    onSelectPreparation,
    onSubmit,
    loading,
    form,
    onProductSelect,
  };
}
