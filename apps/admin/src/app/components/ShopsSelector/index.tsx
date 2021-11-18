import React from 'react';

import { Select } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_SHOPS } from 'app/graph';

import styles from './index.module.css';

interface ShopSelectorProps {
  onSelectShop: (shopId: string) => void;
}

export default function ShopSelector(
  props: ShopSelectorProps
): React.ReactElement {
  const { data } = useQuery(GET_SHOPS);
  const items =
    data?.shops?.filter((shop: { id: string; active: boolean }) => {
      if (!shop.active) return false;
      return true;
    }) || [];

  return (
    <Select
      className={styles.select}
      onChange={(value) => props.onSelectShop((value || '') as string)}
      showSearch
    >
      {items?.map((item: any) => (
        <Select.Option
          value={item.id}
          key={item.id}
        >{`${item.id} -  ${item.name}`}</Select.Option>
      ))}
    </Select>
  );
}
