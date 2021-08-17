import React, { ReactElement } from 'react';
import { Table, Space } from 'antd';
import useProductList from './hooks';

const { Column } = Table;

export default function ProductListEditor(): ReactElement {
  const { productData, setProductData, handleEdit, handleDelete } =
    useProductList();

  return (
    <Table dataSource={productData}>
      <Column title="Product Code" dataIndex="productCode" key="productCode" />
      <Column title="Product Name" dataIndex="productName" key="productName" />
      <Column title="Amount" dataIndex="amount" key="amount" />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <span onClick={handleEdit} onKeyUp={handleEdit} role="presentation">
              Edit
            </span>
            <span
              onClick={handleDelete}
              onKeyUp={handleDelete}
              role="presentation"
            >
              Delete
            </span>
          </Space>
        )}
      />
    </Table>
  );
}
