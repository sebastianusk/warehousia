import React, { ReactElement } from 'react';
import { Menu, Dropdown, Card, Divider, Button, Space } from 'antd';
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
          <h2 className={styles.title}>INBOUND</h2>
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
