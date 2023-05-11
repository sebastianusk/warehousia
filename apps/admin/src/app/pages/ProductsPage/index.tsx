import React, { useContext } from 'react';
import { Button, Card, Space, message } from 'antd';
import ProductListComponent from 'app/components/ProductListComponent';
import WarehouseSelectorAll from 'app/components/WarehousesSelectorAll';
import { GlobalContext } from 'app/components/GlobalState';
import ModalAddProduct from '../../components/ModalAddProduct';
import useProductsPageHooks from './hooks';
import ModalAddProductBulk from '../../components/ModalAddProductBulk';

import styles from './index.module.css';

export default function ProductsPage(): React.ReactElement {
  const {
    showModal,
    setShowModal,
    openModal,
    showBulkModal,
    setShowBulkModal,
    openBulkModal,
  } = useProductsPageHooks();
  const [messageApi, contextHolder] = message.useMessage();
  const { warehouse } = useContext(GlobalContext);

  return (
    <>
      {contextHolder}
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <div>
            <h2>PRODUCTS</h2>
          </div>
          <div>
            <Button
              className={styles.buttonAddOne}
              onClick={openModal}
              disabled={!warehouse.selectedWarehouseAll}
            >
              Add One
            </Button>
            <Button
              onClick={openBulkModal}
              disabled={!warehouse.selectedWarehouseAll}
            >
              Bulk Add
            </Button>
          </div>
        </div>
        <Space size="middle" className="picker-container">
          <div>
            <div>Warehouse:</div>
            <WarehouseSelectorAll />
          </div>
        </Space>
      </Card>
      <ProductListComponent />
      <ModalAddProduct visible={showModal} setVisible={setShowModal} />
      <ModalAddProductBulk
        visible={showBulkModal}
        setVisible={setShowBulkModal}
        onComplete={() => {
          messageApi.info('Upload Complete');
        }}
      />
    </>
  );
}
