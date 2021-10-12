import React, { useEffect, useState } from 'react';
import { Table, Popconfirm } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import client from '../../config/client';
import {
  EditableTableProps,
  ColumnTypes,
  EditableRow,
  EditableCell,
} from '../EditableTable';
import { GET_PRODUCTS, EDIT_PRODUCT } from '../../graph';
import type { Warehouse } from '../../pages/ProductsPage/hooks';

type Columns = (ColumnTypes[number] & {
  editable?: boolean;
  dataIndex: string;
})[];

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
  // const [count, setCount] = useState(0);
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

  // const handleAdd = () => {
  //   const newData: DataType = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: '32',
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   setDataSource([...dataSource, newData]);
  //   setCount(count + 1);
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
      render: (_: any, record: any) =>
        data?.products.data.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            // onConfirm={() => handleDelete(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <div>
      {/* <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button> */}
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
