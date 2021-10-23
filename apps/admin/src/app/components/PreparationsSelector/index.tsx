import React from 'react';
import { Select } from 'antd';

import styles from './index.module.css';

interface PrepSelectorProps {
  onSelectPrep: (prepId: string) => void;
  dataSource: any;
}

export default function ShopSelector(
  props: PrepSelectorProps
): React.ReactElement {
  return (
    <Select className={styles.select} onChange={props.onSelectPrep}>
      {props.dataSource?.map((item: any) => (
        <Select.Option
          value={item.id}
          key={item.id}
        >{`${item.id}`}</Select.Option>
      ))}
    </Select>
  );
}
