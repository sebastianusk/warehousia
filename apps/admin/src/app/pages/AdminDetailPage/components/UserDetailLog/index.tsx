import { useQuery } from '@apollo/client';
import { Card, Table } from 'antd';
import Page from 'app/components/Page';
import { GET_ADMIN_LOG } from 'app/graph';
import React, { useState } from 'react';

import styles from './index.module.css';

const LIMIT = 5;

export default function AdminDetailLog(props: {
  id: string;
}): React.ReactElement {
  const [page, setPage] = useState(1);
  const { data, fetchMore } = useQuery(GET_ADMIN_LOG, {
    variables: { username: props.id, limit: LIMIT, offset: (page - 1) * LIMIT },
  });
  return (
    <Card className={styles.card}>
      <Table
        pagination={false}
        dataSource={data?.adminLogs.map((log: any) => ({
          ...log,
          key: log.id,
        }))}
        columns={[
          { title: 'Date', dataIndex: 'createdAt', key: 'date', width: '25%' },
          { title: 'Action', dataIndex: 'action', key: 'action', width: '15%' },
          { title: 'Remarks', dataIndex: 'remarks', key: 'remarks' },
        ]}
      />
      <Page
        page={page}
        prevEnable={page !== 1}
        nextEnable={data?.adminLogs.length === LIMIT}
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
