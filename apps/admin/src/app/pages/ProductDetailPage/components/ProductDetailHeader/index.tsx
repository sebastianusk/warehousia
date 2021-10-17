import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Spin } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_STOCK } from 'app/graph';
import ModalEditProduct from 'app/components/ModalEditProduct';

import styles from './index.module.css';

export default function ProductDetailHeader(props: {
  productId: string;
}): React.ReactElement {
  const [modal, setModal] = useState(false);
  const { loading, data } = useQuery(GET_PRODUCT_STOCK, {
    variables: { productId: props.productId },
  });

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
            <div>
              Stock:&nbsp;
              {data.productStock.stock}
            </div>
          </div>
        </>
      )}
      <ModalEditProduct
        visible={modal}
        setVisible={setModal}
        initialData={undefined}
      />
    </Card>
  );
}
