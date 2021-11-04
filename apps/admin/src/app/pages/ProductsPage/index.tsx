import React, { useContext } from 'react';
import { Button, Card } from 'antd';
import ProductListComponent from 'app/components/ProductListComponent';
import WarehouseSelectorAll from 'app/components/WarehousesSelectorAll';
import ModalAddProduct from '../../components/ModalAddProduct';
import useProductsPageHooks from './hooks';
import ModalAddProductBulk from '../../components/ModalAddProductBulk';

import styles from './index.module.css';
import { GlobalContext } from 'app/components/GlobalState';

export default function ProductsPage(): React.ReactElement {
  const {
    showModal,
    setShowModal,
    openModal,
    showBulkModal,
    setShowBulkModal,
    openBulkModal,
  } = useProductsPageHooks();
  const { warehouse } = useContext(GlobalContext);

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <div>
            <h2>PRODUCTS</h2>
            <WarehouseSelectorAll />
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
