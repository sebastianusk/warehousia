import React, { ReactElement } from 'react';
import { Button, Input, Card } from 'antd';
import styles from './index.module.css';
import ProductListEditor from '../../components/ProductListEditor';
import ModalAddProduct from '../../components/ModalAddProduct';
import useProductsPageHooks from './hooks';

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
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </div>
        <ProductListEditor />
      </Card>
      <ModalAddProduct visible={showModal} setVisible={setShowModal} />
    </>
  );
}
