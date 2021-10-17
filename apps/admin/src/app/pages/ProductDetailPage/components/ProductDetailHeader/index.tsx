import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Spin, Table } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_STOCK } from 'app/graph';
import ModalEditProduct from 'app/components/ModalEditProduct';
import Column from 'antd/lib/table/Column';

import styles from './index.module.css';
import ProductEditModal from '../ProductEditModal';

export default function ProductDetailHeader(props: {
  productId: string;
}): React.ReactElement {
  const [modal, setModal] = useState(false);
  const { loading, data } = useQuery(GET_PRODUCT_STOCK, {
    variables: { productId: props.productId },
  });
  const showModalEditStock = (warehouseId: string) => {
    console.log('show modal');
  };

  return (
    <Card className={styles.card} key="header">
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
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
          <Table dataSource={data.productStock.stocks} pagination={false}>
            <Column title="Warehouse" dataIndex="warehouseId" key="id" />
            <Column title="Amount" dataIndex="amount" key="amount" />
            <Column
              title="Edit"
              render={(_text: any, record: { warehouseId: string }) => (
                <a
                  onClick={() => showModalEditStock(record.warehouseId)}
                  role="presentation"
                >
                  Edit
                </a>
              )}
            />
          </Table>
        </>
      )}
      <ProductEditModal
        visible={modal}
        onCancel={() => setModal(false)}
        data={{ id: 'cuk', name: 'des', price: 522 }}
      />
    </Card>
  );
}
