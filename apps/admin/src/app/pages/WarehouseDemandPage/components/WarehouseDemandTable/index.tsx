import React, { useContext, useState } from 'react';
import { Card, Table } from 'antd';
import { GET_DEMANDS } from 'app/graph';
import { useQuery } from '@apollo/client';
import Page from 'app/components/Page';
import { GlobalContext } from 'app/components/GlobalState';
import { DemandItem } from '../../hooks';
import EditDemandModal from '../EditDemandModal';

const LIMIT = 10;

export default function WarehouseDemandTable(): React.ReactElement {
  const [page, setPage] = useState(1);
  const [editData, setEditData] = useState<DemandItem>();
  const { warehouse } = useContext(GlobalContext);

  const { data, fetchMore } = useQuery(GET_DEMANDS, {
    variables: {
      warehouseId: warehouse.selectedWarehouseAll,
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
            width: '20%',
            title: 'Created',
          },
          {
            key: 'expiredAt',
            dataIndex: 'expiredAt',
            width: '20%',
            title: 'ExpiredAt',
          },
          { key: 'by', dataIndex: 'createdBy', title: 'By' },
          {
            key: 'shopId',
            dataIndex: 'shopId',
            title: 'Shop ID',
          },
          {
            key: 'product',
            dataIndex: 'productId',
            title: 'Product',
          },
          { key: 'amount', dataIndex: 'amount', title: 'Amount' },
          {
            title: 'Action',
            dataIndex: 'Action',
            key: 'action',
            render: (_text: any, record: DemandItem) => (
              <a onClick={() => setEditData(record)} role="presentation">
                Edit
              </a>
            ),
          },
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
      <EditDemandModal editData={editData} setEditData={setEditData} />
    </Card>
  ) : (
    <div />
  );
}
