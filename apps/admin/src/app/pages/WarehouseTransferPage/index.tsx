import React, { ReactElement } from 'react';
import { Menu, Dropdown, Card, Divider, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import InlineProductForm from '../../components/inlineProductForm';
import ProductListEditor from '../../components/ProductListEditor';
import useTransferPageHooks from './hooks';

export default function WarehouseTransferPage(): ReactElement {
  const {
    handleMenuClickFrom,
    handleMenuClickTo,
    handleVisibleChangeFrom,
    handleVisibleChangeTo,
    showDropDownFrom,
    showDropDownTo,
    selectedWarehouseFrom,
    selectedWarehouseTo,
    warehouseListFrom,
    warehouseListTo,
  } = useTransferPageHooks();

  const menuFrom = (list: string[]) => (
    <Menu onClick={handleMenuClickFrom}>
      {list.map((item) => (
        <Menu.Item key={item}>{item}</Menu.Item>
      ))}
    </Menu>
  );

  const menuTo = (list: string[]) => (
    <Menu onClick={handleMenuClickTo}>
      {list.map((item) => (
        <Menu.Item key={item}>{item}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <h2 className={styles.title}>TRANSFER</h2>
        </div>
        <Space size="middle" className={styles.warehousePicker}>
          <span>FROM</span>
          <Dropdown
            trigger={['click']}
            overlay={menuFrom(warehouseListFrom)}
            onVisibleChange={handleVisibleChangeFrom}
            visible={showDropDownFrom}
            className={styles.dropdownLeft}
          >
            <Button size="large" onClick={(e) => e.preventDefault()}>
              {selectedWarehouseFrom} <DownOutlined />
            </Button>
          </Dropdown>
          <span>TO</span>
          <Dropdown
            trigger={['click']}
            overlay={menuTo(warehouseListTo)}
            onVisibleChange={handleVisibleChangeTo}
            visible={showDropDownTo}
          >
            <Button size="large" onClick={(e) => e.preventDefault()}>
              {selectedWarehouseTo} <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
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
