import React, { ReactElement } from 'react';
import { Button, Input, Card, Table, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import useProductDetailHooks from './hooks';
import ModalEditProduct from '../../components/ModalEditProduct';

const { Column } = Table;

export default function ProductDetailPage(): ReactElement {
  const {
    productDetail,
    handleSearch,
    activitiesLog,
    openModal,
    showModal,
    setShowModal,
  } = useProductDetailHooks();

  return (
    <>
      <Card className={styles.card} key="header">
        <div className={`${styles.flexContainer}`}>
          <h2>
            {productDetail.productCode}&nbsp;-&nbsp;{productDetail.productName}
          </h2>
          <Button size="small" icon={<EditOutlined />} onClick={openModal}>
            Edit
          </Button>
        </div>
        <div>
          <div>
            Category: &nbsp;
            {productDetail.categories?.map((category) => (
              <Tag>{category}</Tag>
            ))}
          </div>
          <div>
            Price: IDR &nbsp;
            {productDetail.price}
          </div>
          <div>
            Stock:&nbsp;
            {productDetail.stock}
          </div>
        </div>
      </Card>
      <Card className={styles.card} key="logs">
        <Input.Search
          placeholder="search activity"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
        <Table dataSource={activitiesLog}>
          <Column title="Date" dataIndex="date" key="date" />
          <Column title="Transaction ID" dataIndex="trx_id" key="trx_id" />
          <Column title="Action" dataIndex="action" key="action" />
          <Column title="Amount" dataIndex="amount" key="amount" />
          <Column title="By" dataIndex="username" key="username" />
        </Table>
      </Card>
      <ModalEditProduct
        visible={showModal}
        setVisible={setShowModal}
        initialData={productDetail}
      />
    </>
  );
}
