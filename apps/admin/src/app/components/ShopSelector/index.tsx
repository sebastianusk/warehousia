import React from 'react';

import { Select } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_SHOPS } from 'app/graph';

import styles from './index.module.css';

interface StoreSelectorProps {
  onSelectStore: (store: string) => void;
}

export default function ShopSelector({
  onSelectStore,
}: StoreSelectorProps): React.ReactElement {
  const { data } = useQuery(GET_SHOPS);
  return (
    <Select
      className={styles.select}
      onChange={(value) => onSelectStore((value || '') as string)}
    >
      {data?.map((item: any) => (
        <Select.Option
          key={item.id}
          value={item.id}
        >{`${item.id} -  ${item.name}`}</Select.Option>
      ))}
    </Select>
  );
}
