import React, { useContext } from 'react';

import { Select } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_WAREHOUSES } from 'app/graph';
import { GlobalContext } from '../GlobalState';

export default function WarehouseSelectorTo(): React.ReactElement {
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

  const onSelectWarehouseTo = (val: string) => {
    warehouse.setSelectedWarehouseTo(val);
  };

  return (
    <Select
      className="wh-selector"
      onChange={(value) => onSelectWarehouseTo((value || '') as string)}
      value={warehouse.selectedWarehouseTo}
    >
      {warehouse.warehousesListAll?.map((item: any) => (
        <Select.Option
          key={item.id}
          value={item.id}
          disabled={item.id === warehouse.selectedWarehouse}
        >{`${item.id} -  ${item.name}`}</Select.Option>
      ))}
    </Select>
  );
}
