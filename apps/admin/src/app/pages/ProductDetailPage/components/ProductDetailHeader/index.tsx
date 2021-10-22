import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, PageHeader, Spin, Table } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_STOCK } from 'app/graph';
import Column from 'antd/lib/table/Column';

import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import ProductEditModal from '../ProductEditModal';
import useProductEditStockModal from '../ProductEditStockModal';

export default function ProductDetailHeader(props: {
  productId: string;
}): React.ReactElement {
  const [modal, setModal] = useState(false);
  const { loading, data } = useQuery(GET_PRODUCT_STOCK, {
    variables: { productId: props.productId },
  });

  const item: {
    name: string;
    price: number;
    stocks: { warehouseId: string; amount: number }[];
  } = data?.productStock;

  const { contextHolder, showEditStockModal } = useProductEditStockModal();
  const history = useHistory();

  return (
    <Card className={styles.card} key="header">
      {loading ? (
        <Spin size="large" />
      ) : (
        <div>
          {contextHolder}
          {item ? (
            <ProductEditModal
              visible={modal}
              onCancel={() => setModal(false)}
              data={{
                id: props.productId,
                name: item.name,
                price: item.price,
              }}
            />
          ) : undefined}

          <div className={`${styles.flexContainer}`}>
            <PageHeader
              title={props.productId}
              onBack={() => history.push('/products')}
            />
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => setModal(true)}
            >
              Edit
            </Button>
          </div>
          <div style={{ margin: '30px 0px' }}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Price">
                {data.productStock.price}
              </Descriptions.Item>
              <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
            </Descriptions>
          </div>
          <Table
            dataSource={item?.stocks.map((stock) => ({
              ...stock,
              key: stock.warehouseId,
            }))}
            pagination={false}
          >
            <Column
              title="Warehouse"
              dataIndex="warehouseId"
              key="id"
              width="30%"
            />
            <Column
              title="Amount"
              dataIndex="amount"
              key="amount"
              width="30%"
            />
            <Column
              title="Edit"
              key="edit"
              render={(
                _text: any,
                record: { warehouseId: string; amount: number }
              ) => (
                <a
                  onClick={() => {
                    showEditStockModal(
                      props.productId,
                      record.warehouseId,
                      record.amount
                    );
                  }}
                  role="presentation"
                >
                  Edit
                </a>
              )}
            />
          </Table>
        </div>
      )}
    </Card>
  );
}
