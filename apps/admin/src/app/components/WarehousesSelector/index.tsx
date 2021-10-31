import React, { useContext } from 'react';

import { Select } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_WAREHOUSES } from 'app/graph';
import { GlobalContext } from '../GlobalState';

import styles from './index.module.css';

interface WarehouseSelectorProps {
  all?: boolean;
  feature?: string | undefined;
}

export default function WarehouseSelector({
  all,
  feature,
}: WarehouseSelectorProps): React.ReactElement {
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
          if (all) return true;
          if (!wh.active) return false;
          if (userData.userData?.role === 'SUPER_ADMIN') return true;
          if (feature && !wh.features.includes(feature)) return false;
          if (!userData.userData?.warehouses.includes(wh.id)) return false;
          return true;
        }
      );
      warehouse.setWarehousesList(items);
    },
  });

  const onSelectWarehouse = (val: string) => {
    warehouse.setSelectedWarehouse(val);
  };

  return (
    <Select
      className={styles.select}
      onChange={(value) => onSelectWarehouse((value || '') as string)}
      value={warehouse.selectedWarehouse}
    >
      {warehouse.warehousesList?.map((item: any) => (
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
