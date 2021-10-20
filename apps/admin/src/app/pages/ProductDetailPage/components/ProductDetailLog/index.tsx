import React, { useState } from 'react';
import { Button, Card, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { useQuery } from '@apollo/client';

import { GET_PRODUCT_LOGS } from 'app/graph';

import Page from 'app/components/Page';

import styles from './index.module.css';

const LIMIT = 3;

export default function ProductDetailLog(props: {
  productId: string;
}): React.ReactElement {
  const [page, setPage] = useState(1);
  const { loading, data, fetchMore } = useQuery(GET_PRODUCT_LOGS, {
    variables: {
      productId: props.productId,
      offset: (page - 1) * LIMIT,
      limit: LIMIT,
    },
  });
  return (
    <Card className={styles.card} key="logs">
      <Table
        loading={loading}
        dataSource={data?.productLog.map((item: { id: string }) => ({
          ...item,
          key: item.id,
        }))}
        pagination={false}
      >
        <Column title="Time" dataIndex="createdAt" key="createdAt" />
        <Column title="Warehouse" dataIndex="warehouse" key="warehouse" />
        <Column title="Action" dataIndex="action" key="action" />
        <Column title="Amount" dataIndex="amount" key="amount" />
        <Column title="By" dataIndex="createdBy" key="createdBy" />
      </Table>
      <Page
        page={page}
        prevEnable={page !== 1}
        nextEnable={data?.productLog.lenght !== 0}
        onNext={() => {
          const newOffset = page * LIMIT;
          fetchMore({ variables: { offset: newOffset } }).then(() =>
            setPage(page + 1)
          );
        }}
        onPrev={() => {
          setPage(page - 1);
        }}
      />
    </Card>
  );
}