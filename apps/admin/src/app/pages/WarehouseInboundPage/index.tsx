import React, { ReactElement, useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import InlineProductForm from '../../components/inlineProductForm';
import ProductListEditor from '../../components/ProductListEditor';

export default function WarehouseInboundPage(): ReactElement {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState('warehouse1');
  const handleVisibleChange = () => {
    setShowDropDown(!showDropDown);
  };

  const handleMenuClick = (e: { key: React.SetStateAction<string> }) => {
    setSelectedWarehouse(e.key);
    setShowDropDown(false);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="warehouseA">warehouseA</Menu.Item>
      <Menu.Item key="warehouseB">warehouseB</Menu.Item>
      <Menu.Item key="warehouseC">warehouseC</Menu.Item>
    </Menu>
  );

  return (
    <>
      <h2>INBOUND PAGE</h2>
      <Dropdown
        overlay={menu}
        onVisibleChange={handleVisibleChange}
        visible={showDropDown}
      >
        <button
          className={styles.dropdownButton}
          onClick={(e) => e.preventDefault()}
          type="button"
        >
          {selectedWarehouse} <DownOutlined />
        </button>
      </Dropdown>
      <InlineProductForm />
      <ProductListEditor />
    </>
  );
}
