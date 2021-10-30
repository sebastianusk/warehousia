import React, { useContext } from 'react';

import { Select } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_WAREHOUSES } from 'app/graph';
import UserContext from '../UserContext';

import styles from './index.module.css';

interface WarehouseSelectorProps {
  onSelectWarehouse: (warehouseId: string) => void;
  all?: boolean;
  feature?: string | undefined;
}

export default function WarehouseSelector({
  onSelectWarehouse,
  all,
  feature,
}: WarehouseSelectorProps): React.ReactElement {
  const user = useContext(UserContext);
  const { data } = useQuery(GET_WAREHOUSES);
  const items = data?.warehouses
    ? data?.warehouses.filter(
        (warehouse: {
          id: string;
          name: string;
          active: boolean;
          features: string[];
        }) => {
          if (all) return true;
          if (!warehouse.active) return false;
          if (user?.role === 'SUPER_ADMIN') return true;
          if (feature ? !warehouse.features.includes(feature) : false)
            return false;
          if (user?.warehouses.includes(warehouse.id)) return false;
          return true;
        }
      )
    : [];

  return (
    <Select
      className={styles.select}
      onChange={(value) => onSelectWarehouse((value || '') as string)}
    >
      {items?.map((item: any) => (
        <Select.Option
          key={item.id}
          value={item.id}
        >{`${item.id} -  ${item.name}`}</Select.Option>
      ))}
    </Select>
  );
}

WarehouseSelector.defaultProps = {
  all: false,
  feature: undefined,
};
