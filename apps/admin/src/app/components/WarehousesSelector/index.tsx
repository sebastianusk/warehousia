import React, { useContext, useState } from 'react';

import { Select  } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_WAREHOUSES } from 'app/graph';
import UserContext from '../UserContext';

import styles from './index.module.css';

interface WarehouseSelectorProps {
  onSelectWarehouse: (warehouseId: string) => void;
}

export default function WarehouseSelector(
  props: WarehouseSelectorProps
): React.ReactElement {
  const user = useContext(UserContext);
  const { data } = useQuery(GET_WAREHOUSES);
  const items = data?.warehouses
    ? data?.warehouses.filter((warehouse: any) =>
        user?.role === 'SUPER_ADMIN'
          ? true
          : user?.warehouses.includes(warehouse.id)
      )
    : [];

  return (
    <Select
      className={styles.select}
      onChange={(value) => props.onSelectWarehouse((value || '') as string)}
    >
      {items?.map((item: any) => (
        <Select.Option
          value={item.id}
        >{`${item.id} -  ${item.name}`}</Select.Option>
      ))}
    </Select>
  );
}
