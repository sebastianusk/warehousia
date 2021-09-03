import React, { ReactElement } from 'react';
import { Menu, Dropdown, Card, Divider, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import InlineProductForm from '../../components/inlineProductForm';
import ProductListEditor from '../../components/ProductListEditor';
import useTransferPageHooks from './hooks';

export default function WarehouseOutboundPage(): ReactElement {
  const {
    handleMenuClickWarehouse,
    handleMenuClickShop,
    handleVisibleChangeWarehouse,
    handleVisibleChangeShop,
    showDropDownWarehouse,
    showDropDownShop,
    selectedWarehouse,
    selectedShop,
    warehouseList,
    shopList,
  } = useTransferPageHooks();

  const menuWarehouse = (list: string[]) => (
    <Menu onClick={handleMenuClickWarehouse}>
      {list.map((item) => (
        <Menu.Item key={item}>{item}</Menu.Item>
      ))}
    </Menu>
  );

  const menuShop = (list: string[]) => (
    <Menu onClick={handleMenuClickShop}>
      {list.map((item) => (
        <Menu.Item key={item}>{item}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <h2 className={styles.title}>OUTBOUND</h2>
        </div>
        <Space size="middle" className={styles.warehousePicker}>
          <span>FROM</span>
          <Dropdown
            trigger={['click']}
            overlay={menuWarehouse(warehouseList)}
            onVisibleChange={handleVisibleChangeWarehouse}
            visible={showDropDownWarehouse}
            className={styles.dropdownLeft}
          >
            <Button size="large" onClick={(e) => e.preventDefault()}>
              {selectedWarehouse} <DownOutlined />
            </Button>
          </Dropdown>
          <span>FOR</span>
          <Dropdown
            trigger={['click']}
            overlay={menuShop(shopList)}
            onVisibleChange={handleVisibleChangeShop}
            visible={showDropDownShop}
          >
            <Button size="large" onClick={(e) => e.preventDefault()}>
              {selectedShop} <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      </Card>
      <Card className={styles.card}>
        <h3>Input Order</h3>
        <InlineProductForm />
        <Divider />
        <ProductListEditor />
        <div className={`${styles.bottomAction}`}>
          <Space size="middle">
            <Button>Bulk Input</Button>
            <Button>error log</Button>
          </Space>
          <Button size="large" type="primary">
            Submit
          </Button>
        </div>
      </Card>
    </>
  );
}
