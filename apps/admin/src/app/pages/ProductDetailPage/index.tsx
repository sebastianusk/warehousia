import React from 'react';
import { Input, Card, Table } from 'antd';
import { useParams } from 'react-router-dom';
import ModalEditProduct from '../../components/ModalEditProduct';
import ProductDetailHeader from './components/ProductDetailHeader';

import styles from './index.module.css';

const { Column } = Table;

type ProductDetailParam = {
  id: string;
};

export default function ProductDetailPage(): React.ReactElement {

  const { id } = useParams<ProductDetailParam>();

  return (
    <>
      <ProductDetailHeader productId={id} />
      <Card className={styles.card} key="logs">
        <Table>
          <Column title="Date" dataIndex="date" key="date" />
          <Column title="Transaction ID" dataIndex="trx_id" key="trx_id" />
          <Column title="Action" dataIndex="action" key="action" />
          <Column title="Amount" dataIndex="amount" key="amount" />
          <Column title="By" dataIndex="username" key="username" />
        </Table>
      </Card>
    </>
  );
}
