import { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { message } from 'antd';
import { FormInstance, useForm } from 'antd/lib/form/Form';

import { ADD_MISSING, GET_PREPARATION } from 'app/graph';
import { GlobalContext } from 'app/components/GlobalState';

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
  const { warehouse } = useContext(GlobalContext);
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
      warehouseId: warehouse.selectedWarehouse,
    },
    onCompleted: onCompletedFetchPrep,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    refetch({
      warehouseId: warehouse.selectedWarehouse,
    });
  }, [refetch, warehouse.selectedWarehouse]);

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
          warehouseId: warehouse.selectedWarehouse,
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
    if (selectedItem) {
      form.setFieldsValue(selectedItem);
    }
  };

  return {
    selectedWarehouse: warehouse.selectedWarehouse,
    dataSource,
    selectedPrep,
    onSelectPreparation,
    onSubmit,
    loading,
    form,
    onProductSelect,
  };
}
