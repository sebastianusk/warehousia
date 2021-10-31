import React from 'react';
import { Button, Card } from 'antd';
import ProductListComponent from 'app/components/ProductListComponent';
import WarehouseSelector from 'app/components/WarehousesSelector';
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

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <div>
            <h2>PRODUCTS</h2>
            <WarehouseSelector all />
          </div>
          <div>
            <Button className={styles.buttonAddOne} onClick={openModal}>
              Add One
            </Button>
            <Button onClick={openBulkModal}>Bulk Add</Button>
          </div>
        </div>
      </Card>
      <ProductListComponent />
      <ModalAddProduct visible={showModal} setVisible={setShowModal} />
      <ModalAddProductBulk
        visible={showBulkModal}
        setVisible={setShowBulkModal}
      />
    </>
  );
}
