import React, { ReactElement, SetStateAction } from 'react';
import { Menu, Dropdown, Card, Button, Checkbox } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import styles from './index.module.css';
import usePreparingHooks from './hooks';
import UserContext from '../../components/UserContext';
import TablePreparation from '../../components/TablePreparation';

type MenuProps = {
  list: string[];
  onClick(e: { key: SetStateAction<string> }): void;
};

export default function WarehousePreparingPage(): ReactElement {
  const {
    handleMenuClick,
    onChangeVisibleWHMenu,
    showDropDown,
    selectedWarehouse,
    onSubmit,
    loading,
    setDefaultWarehouse,
    shopsOption,
    selectedShops,
    onChangeSelectShops,
    dataSource,
  } = usePreparingHooks();

  const menu = ({ list, onClick }: MenuProps) => (
    <Menu onClick={onClick}>
      {list.map((item) => (
        <Menu.Item key={item}>{item}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <UserContext.Consumer>
      {(user: any) => (
        <>
          <Card className={styles.card}>
            <div className={`${styles.flexContainer}`}>
              <h2 className={styles.title}>Preparing</h2>
              <div>
                <div>Warehouse ID:</div>
                <Dropdown
                  overlay={menu({
                    list: user.warehouses,
                    onClick: handleMenuClick,
                  })}
                  onVisibleChange={onChangeVisibleWHMenu}
                  visible={showDropDown}
                >
                  <Button size="large" onClick={(e) => e.preventDefault()}>
                    {selectedWarehouse || setDefaultWarehouse(user.warehouses)}
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
              <div>
                <div>Select Shop(s):</div>
                <div>
                  <Checkbox.Group
                    onChange={onChangeSelectShops}
                    value={selectedShops}
                    options={shopsOption}
                  />
                </div>
              </div>
            </div>
          </Card>
          <Card className={styles.card}>
            <TablePreparation data={dataSource?.items} />
            <div className={`${styles.bottomAction}`}>
              <Button
                size="large"
                type="primary"
                onClick={onSubmit}
                loading={loading}
              >
                Submit
              </Button>
            </div>
          </Card>
        </>
      )}
    </UserContext.Consumer>
  );
}
