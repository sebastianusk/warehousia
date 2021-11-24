import { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { message } from 'antd';
import { ADD_PREPARATION, GET_OUTBOUNDS } from 'app/graph';
import { GlobalContext } from 'app/components/GlobalState';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import usePreparingXslxHooks from 'app/lib/xlsx/preparingXlsxHooks';

interface PreparingState {
  selectedWarehouse: string;
  shopsOption:
    | {
        label: string;
        value: string;
      }[]
    | [];
  onChangeSelectShops(e: any): void;
  selectedShops: string[] | [];
  onSubmit(): void;
  loading: boolean;
  dataSource: DataSource;
  onCheckAllChange(e: CheckboxChangeEvent): void;
}

type DataSource =
  | {
      productId: string;
      actual: number;
    }[]
  | [];

export default function usePreparingHooks(): PreparingState {
  const { warehouse } = useContext(GlobalContext);
  const [shopsOption, setShopsOption] = useState<any[]>([]); // array of shopid string
  const [selectedShops, setSelectedShops] = useState<string[] | []>([]);
  const [dataSource, setDataSource] = useState<DataSource>([]); // datatoshow
  const [addPreparation, { loading }] = useMutation(ADD_PREPARATION);
  const { buildPreparingXlsx } = usePreparingXslxHooks();

  const { data, refetch } = useQuery(GET_OUTBOUNDS, {
    variables: {
      warehouseId: warehouse.selectedWarehouse,
    },
    onCompleted(response) {
      if (response?.outbounds.length > 0) {
        const shopList = [
          ...new Set(
            response.outbounds.map((item: { shopId: string }) => item.shopId)
          ),
        ];
        setShopsOption(shopList);
      } else {
        setShopsOption([]);
      }
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    setSelectedShops([]);
    refetch({
      warehouseId: warehouse.selectedWarehouse,
    });
  }, [refetch, warehouse.selectedWarehouse]);

  const mergeDuplicateId = (arr: any[]) => {
    const result = arr.reduce((acc, obj) => {
      let found = false;
      for (let i = 0; i < acc.length; i += 1) {
        if (acc[i].productId === obj.productId) {
          found = true;
          acc[i].actual += obj.actual;
        }
      }
      if (!found) {
        acc.push(obj);
      }
      return acc;
    }, []);
    return result;
  };

  const fillDataSource = (shopIds: any) => {
    if (data.outbounds.length > 0) {
      const newData: DataSource = data.outbounds
        .filter((item: any) => shopIds.includes(item.shopId))
        .map((el: any) => ({
          productId: el.productId,
          actual: el.amount,
        }));
      const mergedData = mergeDuplicateId(newData);
      mergedData.sort((a: any, b: any) => b.actual - a.actual);
      setDataSource(mergedData);
    }
  };

  const onChangeSelectShops = (shopIds: any) => {
    setSelectedShops(shopIds);
    fillDataSource(shopIds);
  };

  const onSubmit = () => {
    addPreparation({
      variables: {
        warehouseId: warehouse.selectedWarehouse,
        shopId: selectedShops,
      },
    }).then((resp) => {
      if (!resp.errors) {
        buildPreparingXlsx({
          items: dataSource,
          id: resp.data.addPreparation.id,
          warehouseId: warehouse.selectedWarehouse,
          shops: selectedShops,
        });
        message.info('Successfully create Preparation');

        setDataSource([]);
        setSelectedShops([]);
        refetch({
          warehouseId: warehouse.selectedWarehouse,
        });
      } else {
        console.log(resp.errors);
      }
    });
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setSelectedShops(shopsOption);
      fillDataSource(shopsOption);
    } else {
      setSelectedShops([]);
      fillDataSource([]);
    }
  };

  return {
    selectedWarehouse: warehouse.selectedWarehouse,
    shopsOption,
    onChangeSelectShops,
    selectedShops,
    onSubmit,
    loading,
    dataSource,
    onCheckAllChange,
  };
}
