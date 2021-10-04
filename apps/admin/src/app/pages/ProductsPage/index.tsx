import React, { ReactElement } from 'react';
import { Button, Input, Card } from 'antd';
import styles from './index.module.css';
import ModalAddProduct from '../../components/ModalAddProduct';
import useProductsPageHooks from './hooks';
import ProductListEditorv2 from '../../components/ProductListEditorv2';

export default function ProductsPage(): ReactElement {
  const { showModal, setShowModal, openModal, onSearch } =
    useProductsPageHooks();

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <h2>PRODUCTS</h2>
          <div>
            <Button className={styles.buttonAddOne} onClick={openModal}>
              Add One
            </Button>
            <Button>Bulk Add</Button>
          </div>
        </div>
      </Card>
      <Card className={styles.card}>
        <div className={styles.flexContainer}>
          <h2>Product List</h2>
          <Input.Search
            placeholder="search by product name"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </div>
        <ProductListEditorv2 />
      </Card>
      <ModalAddProduct visible={showModal} setVisible={setShowModal} />
    </>
  );
}
