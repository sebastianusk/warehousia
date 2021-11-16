import React, { useContext, useState } from 'react';
import { Card, Table } from 'antd';
import { GET_DEMANDS } from 'app/graph';
import { useQuery } from '@apollo/client';
import Page from 'app/components/Page';
import { GlobalContext } from 'app/components/GlobalState';

const LIMIT = 10;

export default function WarehouseDemandTable(): React.ReactElement {
  const [page, setPage] = useState(1);
  const { warehouse } = useContext(GlobalContext);

  const { data, fetchMore } = useQuery(GET_DEMANDS, {
    variables: {
      warehouseId: warehouse.selectedWarehouse,
      limit: LIMIT,
      offset: (page - 1) * LIMIT,
    },
  });
  return data?.demands ? (
    <Card>
      <Table
        dataSource={data.demands}
        pagination={false}
        columns={[
          {
            key: 'createdAt',
            dataIndex: 'createdAt',
            width: '30%',
            title: 'Created',
          },
          { key: 'by', dataIndex: 'createdBy', width: '20%', title: 'By' },
          {
            key: 'expiredAt',
            dataIndex: 'expiredAt',
            width: '20%',
            title: 'ExpiredAt',
          },
          {
            key: 'shopId',
            dataIndex: 'shopId',
            title: 'Shop ID',
            width: '20%',
          },
          {
            key: 'product',
            dataIndex: 'productId',
            width: '20%',
            title: 'Product',
          },
          { key: 'amount', dataIndex: 'amount', title: 'Amount' },
        ]}
      />
      <Page
        page={page}
        nextEnable={data.demands.length === LIMIT}
        prevEnable={page !== 1}
        onNext={() => {
          fetchMore({ variables: { offset: page * LIMIT } }).then(() =>
            setPage(page + 1)
          );
        }}
        onPrev={() => setPage(page - 1)}
      />
    </Card>
  ) : (
    <div />
  );
}
