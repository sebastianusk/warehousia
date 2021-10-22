import React from 'react';
import { Button, Card, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ProductListComponent from 'app/components/ProductListComponent';
import ModalAddProduct from '../../components/ModalAddProduct';
import useProductsPageHooks from './hooks';
import type { WarehouseList } from './hooks';
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
    handleMenuClick,
    handleVisibleDropdown,
    selectedWarehouse,
    warehouseList,
    loading,
    error,
    showDropDown,
  } = useProductsPageHooks();

  const menu = (list: WarehouseList | undefined) => (
    <Menu onClick={handleMenuClick}>
      {list &&
        list.map((item) => <Menu.Item key={item.id}>{item.name}</Menu.Item>)}
    </Menu>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.toString()}</div>;

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <div>
            <h2>PRODUCTS</h2>
            <Dropdown
              overlay={menu(warehouseList)}
              onVisibleChange={handleVisibleDropdown}
              visible={showDropDown}
            >
              <Button size="large" onClick={(e) => e.preventDefault()}>
                {selectedWarehouse?.name} <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div>
            <Button className={styles.buttonAddOne} onClick={openModal}>
              Add One
            </Button>
            <Button onClick={openBulkModal}>Bulk Add</Button>
          </div>
        </div>
      </Card>
      {selectedWarehouse && (
        <ProductListComponent selectedWarehouse={selectedWarehouse} />
      )}
      <ModalAddProduct visible={showModal} setVisible={setShowModal} />
      <ModalAddProductBulk
        visible={showBulkModal}
        setVisible={setShowBulkModal}
      />
    </>
  );
}
