import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Spin, Table } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_STOCK } from 'app/graph';
import Column from 'antd/lib/table/Column';

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
            <h2>
              {props.productId}&nbsp;-&nbsp;{data.productStock.name}
            </h2>
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => setModal(true)}
            >
              Edit
            </Button>
          </div>
          <div>
            <div>
              Price: IDR &nbsp;
              {data.productStock.price}
            </div>
          </div>
          <Table
            dataSource={item?.stocks.map((stock) => ({
              ...stock,
              key: stock.warehouseId,
            }))}
            pagination={false}
          >
            <Column title="Warehouse" dataIndex="warehouseId" key="id" />
            <Column title="Amount" dataIndex="amount" key="amount" />
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
