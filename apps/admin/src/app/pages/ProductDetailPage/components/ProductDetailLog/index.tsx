import React from 'react';
import { Card, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { useQuery } from '@apollo/client';

import { GET_PRODUCT_LOGS } from 'app/graph';

import styles from './index.module.css';

export default function ProductDetailLog(props: {
  productId: string;
}): React.ReactElement {
  const { loading, data } = useQuery(GET_PRODUCT_LOGS, {
    variables: {
      productId: props.productId,
      pagination: { offset: 0, limit: 10 },
    },
  });
  return (
    <Card className={styles.card} key="logs">
      <Table loading={loading} dataSource={data?.productLog?.data}>
        <Column title="Time" dataIndex="createdAt" key="createdAt" />
        <Column title="Product ID" dataIndex="id" key="id" />
        <Column title="Action" dataIndex="action" key="action" />
        <Column title="Amount" dataIndex="amount" key="amount" />
        <Column title="By" dataIndex="createdBy" key="createdBy" />
      </Table>
    </Card>
  );
}
