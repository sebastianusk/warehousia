import React, { ReactElement } from 'react';
import { Table, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useProductList from './hooks';
import styles from './index.module.css';

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
            <span
              onClick={handleEdit}
              onKeyUp={handleEdit}
              role="presentation"
              className={styles.actionItem}
            >
              <EditOutlined />
              &nbsp;Edit
            </span>
            <span
              onClick={handleDelete}
              onKeyUp={handleDelete}
              role="presentation"
              className={styles.actionItem}
            >
              <DeleteOutlined />
              &nbsp;Delete
            </span>
          </Space>
        )}
      />
    </Table>
  );
}
