import React, { useContext } from 'react';

import { Select } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_WAREHOUSES } from 'app/graph';
import { GlobalContext } from '../GlobalState';

import styles from './index.module.css';

export default function WarehouseSelectorAll(): React.ReactElement {
  const { userData, warehouse } = useContext(GlobalContext);
  useQuery(GET_WAREHOUSES, {
    skip: !userData.userData,
    onCompleted: (data) => {
      const items = data.warehouses.filter(
        (wh: {
          id: string;
          name: string;
          active: boolean;
          features: string[];
        }) => {
          if (!wh.active) return false;
          return true;
        }
      );
      warehouse.setWarehousesListAll(items);
    },
  });

  const onSelectWarehouseAll = (val: string) => {
    warehouse.setSelectedWarehouseAll(val);
  };

  return (
    <Select
      className={styles.select}
      onChange={(value) => onSelectWarehouseAll((value || '') as string)}
      value={warehouse.selectedWarehouseAll}
    >
      {warehouse.warehousesListAll?.map((item: any) => (
        <Select.Option
          key={item.id}
          value={item.id}
        >{`${item.id} -  ${item.name}`}</Select.Option>
      ))}
    </Select>
  );
}
