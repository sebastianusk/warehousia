import React, { ReactElement } from 'react';
import { Menu, Dropdown, Card, Divider, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import InlineProductForm from '../../components/inlineProductForm';
import ProductListEditor from '../../components/ProductListEditor';
import useInboundHooks from './hooks';

export default function WarehouseInboundPage(): ReactElement {
  const {
    handleMenuClick,
    handleVisibleChange,
    showDropDown,
    selectedWarehouse,
    warehouseList,
  } = useInboundHooks();

  const menu = (list: string[]) => (
    <Menu onClick={handleMenuClick}>
      {list.map((item) => (
        <Menu.Item key={item}>{item}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <h2 className={styles.title}>WAREHOUSE INBOUND</h2>
          <Dropdown
            overlay={menu(warehouseList)}
            onVisibleChange={handleVisibleChange}
            visible={showDropDown}
          >
            <Button size="large" onClick={(e) => e.preventDefault()}>
              {selectedWarehouse} <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Card>
      <Card className={styles.card}>
        <InlineProductForm />
        <Divider />
        <ProductListEditor />
      </Card>
    </>
  );
}
