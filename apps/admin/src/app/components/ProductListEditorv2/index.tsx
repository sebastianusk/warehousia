import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useQuery, useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { GET_PRODUCTS } from '../../graph';
import type { Warehouse } from '../../pages/ProductsPage/hooks';
import styles from './index.module.css';

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

function ProductListEditable(props: {
  selectedWarehouse: Warehouse | undefined;
}): React.ReactElement {
  const history = useHistory();
  const client = useApolloClient();
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      warehouseId: props.selectedWarehouse?.id,
      query: '',
      pagination: {
        offset: 0,
        limit: 10,
      },
    },
  });

  useEffect(() => {
    client.refetchQueries({
      include: ['products'],
    });
  }, [client, props.selectedWarehouse?.id]);

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
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Current WH Stock',
      dataIndex: ['stock', 'amount'],
      key: 'currentStock',
    },
    {
      title: 'Top Warehouse',
      dataIndex: ['stock', 'topWarehouse'],
      key: 'topWarehouse',
    },
    {
      title: 'Total Stock',
      dataIndex: ['stock', 'all'],
      key: 'total',
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
    <div>
      <Table
        bordered
        dataSource={data.products.data}
        columns={columns}
        {...props}
      />
    </div>
  );
}
export default ProductListEditable;
