import React, { ReactElement } from 'react';
import { Table, Space, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useProductList from './hooks';

const { Column } = Table;

export default function ProductListEditor(): ReactElement {
  const { productData, handleEdit, handleDelete, handleRowClick } =
    useProductList();

  return (
    <Table
      dataSource={productData}
      onRow={(record, rowIndex) => ({
        onClick: (e) => {
          handleRowClick(e, rowIndex, record);
        },
      })}
    >
      <Column title="Product Code" dataIndex="productCode" key="productCode" />
      <Column title="Product Name" dataIndex="productName" key="productName" />
      <Column title="Amount" dataIndex="amount" key="amount" />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <Button size="small" icon={<EditOutlined />} onClick={handleEdit}>
              Edit
            </Button>
            <Button
              size="small"
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Space>
        )}
      />
    </Table>
  );
}
