import React, { useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import {
  EditableTableProps,
  ColumnTypes,
  EditableRow,
  EditableCell,
} from '../EditableTable';
import { GET_PRODUCTS, EDIT_PRODUCT } from '../../graph';
import type { Warehouse } from '../../pages/ProductsPage/hooks';
import styles from './index.module.css';

// type Columns = (ColumnTypes[number] & {
//   editable?: boolean;
//   dataIndex: string;
// })[];

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

function ProductListEditable(
  props: EditableTableProps & { selectedWarehouse: Warehouse | undefined }
) {
  const history = useHistory();
  // const [count, setCount] = useState(0);
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

  const [editProduct] = useMutation(EDIT_PRODUCT);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.toString()}</div>;

  // const handleDelete = (id: string) => {
  //   setDataSource(dataSource.filter((item: DataType) => item.id !== id));
  // };

  const handleSave = (row: DataType) => {
    editProduct({
      variables: {
        input: {
          id: row.id,
          name: row.name,
        },
      },
      refetchQueries: [
        {
          query: GET_PRODUCTS,
          variables: {
            warehouseId: props.selectedWarehouse?.id,
            query: '',
            pagination: {
              offset: 0,
              limit: 10,
            },
          },
        },
      ],
    });
  };

  const handleViewDetail = (product_id: any) => {
    console.log(product_id);
    history.push(`/product-detail/${product_id}`);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = [
    {
      title: 'Product Code',
      dataIndex: 'id',
      width: '15%',
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      editable: true,
      onCell: (record: DataType) => ({
        record,
        editable: true,
        dataIndex: 'name',
        title: 'Product Name',
        handleSave,
      }),
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
            <Popconfirm title="Sure to delete?">
              <a>Delete</a>
            </Popconfirm>
          </>
        ) : null,
    },
  ];

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={data.products.data}
        columns={columns as ColumnTypes}
        {...props}
      />
    </div>
  );
}
export default ProductListEditable;
