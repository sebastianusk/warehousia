import React, { ReactElement } from 'react';
import { Button, Input, Card, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import ModalAddProduct from '../../components/ModalAddProduct';
import useProductsPageHooks from './hooks';
import ProductListEditorv2 from '../../components/ProductListEditorv2';
import type { WarehouseList } from './hooks';

export default function ProductsPage(): ReactElement {
  const {
    showModal,
    setShowModal,
    openModal,
    onSearch,
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
        {selectedWarehouse && (
          <ProductListEditorv2 selectedWarehouse={selectedWarehouse} />
        )}
      </Card>
      <ModalAddProduct visible={showModal} setVisible={setShowModal} />
    </>
  );
}
