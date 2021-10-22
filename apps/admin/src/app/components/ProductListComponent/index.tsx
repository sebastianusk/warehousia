import React, { useEffect, useState } from 'react';
import { Card, Input, Table } from 'antd';
import { useQuery, useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { GET_PRODUCTS } from '../../graph';
import type { Warehouse } from '../../pages/ProductsPage/hooks';
import styles from './index.module.css';
import Page from '../Page';

type DataType = {
  id: string;
  name: string;
  stock: {
    amount: number;
    all: number;
    topWarehouse: string;
    topAmount: number;
  };
};

const LIMIT = 5;

export default function ProductListComponent(props: {
  selectedWarehouse: Warehouse | undefined;
}): React.ReactElement {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const client = useApolloClient();
  const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {
      warehouseId: props.selectedWarehouse?.id,
      query: '',
      offset: (page - 1) * LIMIT,
      limit: LIMIT,
    },
  });
  useEffect(() => {
    client.refetchQueries({
      include: ['products'],
    });
  }, [client, props.selectedWarehouse?.id, search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.toString()}</div>;

  const handleViewDetail = (item: DataType) => {
    history.push(`/product-detail/${item.id}`);
  };

  const columns = [
    {
      title: 'Product Code',
      dataIndex: 'id',
      key: 'id',
      width: '15%',
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '10%',
    },
    {
      title: 'Total',
      dataIndex: ['stock', 'all'],
      key: 'total',
      width: '7%',
    },
    {
      title: 'Stock',
      dataIndex: ['stock', 'amount'],
      key: 'currentStock',
      width: '7%',
    },
    {
      title: 'Top Warehouse',
      dataIndex: ['stock', 'topWarehouse'],
      key: 'topWarehouse',
      width: '10%',
    },
    {
      title: 'Top Stock',
      dataIndex: ['stock', 'topAmount'],
      key: 'topWarehouse',
      width: '7%',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'action',
      render: (_text: any, record: DataType) => (
        <a
          onClick={() => handleViewDetail(record)}
          role="presentation"
          className={styles.actionView}
        >
          View
        </a>
      ),
    },
  ];

  return (
    <Card className={styles.card}>
      <div>
        <h2>Product List</h2>
        <div className={styles.search}>
          <Input.Search
            placeholder="search by product name"
            onSearch={(value) => setSearch(value)}
            style={{ width: 200 }}
          />
        </div>

        <Table
          bordered
          dataSource={data.products.map((item: any) => ({
            ...item,
            key: item.id,
          }))}
          columns={columns}
          pagination={false}
        />
        <Page
          page={page}
          nextEnable={data.products.length === LIMIT}
          prevEnable={page !== 1}
          onNext={() => {
            fetchMore({ variables: { offset: page * LIMIT } }).then(() =>
              setPage(page + 1)
            );
          }}
          onPrev={() => setPage(page - 1)}
        />
      </div>
    </Card>
  );
}
