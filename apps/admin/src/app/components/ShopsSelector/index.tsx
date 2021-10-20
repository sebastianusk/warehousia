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
  const { data } = useQuery(GET_SHOPS, {
    variables: {
      pagination: {
        limit: 10,
        offset: 0,
      },
    },
  });
  const items = data?.shops?.data || [];

  return (
    <Select
      className={styles.select}
      onChange={(value) => props.onSelectShop((value || '') as string)}
    >
      {items?.map((item: any) => (
        <Select.Option
          value={item.id}
        >{`${item.id} -  ${item.name}`}</Select.Option>
      ))}
    </Select>
  );
}
