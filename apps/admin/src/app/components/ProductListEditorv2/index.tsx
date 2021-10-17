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
  }, [props.selectedWarehouse?.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.toString()}</div>;

  const handleViewDetail = (product_id: any) => {
    console.log(product_id);
    history.push(`/product-detail/${product_id}`);
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
    },
    {
      title: 'Top Warehouse',
      dataIndex: ['stock', 'topWarehouse'],
    },
    {
      title: 'Total Stock',
      dataIndex: ['stock', 'all'],
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: (record: DataType) =>
        data?.products.data.length >= 1 ? (
          <>
            <a
              onClick={() => handleViewDetail(record)}
              role="presentation"
              className={styles.actionView}
            >
              View
            </a>
          </>
        ) : null,
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
