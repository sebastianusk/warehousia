import React, { ReactElement } from 'react';
import { Menu, Dropdown, Card, Divider, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import InlineProductForm from '../../components/inlineProductForm';
import InboundListEditor from '../../components/InboundListEditor';
import useInboundHooks from './hooks';
import UserContext from '../../components/UserContext';

export default function WarehouseInboundPage(): ReactElement {
  const {
    handleMenuClick,
    handleVisibleChange,
    showDropDown,
    selectedWarehouse,
    dataList,
    setDataList,
    onSubmit,
    loading,
  } = useInboundHooks();

  const menu = (list: string[]) => (
    <Menu onClick={handleMenuClick}>
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
              <h2 className={styles.title}>INBOUND</h2>
              <Dropdown
                overlay={menu(user.warehouses)}
                onVisibleChange={handleVisibleChange}
                visible={showDropDown}
              >
                <Button size="large" onClick={(e) => e.preventDefault()}>
                  {selectedWarehouse || user.warehouses[0]}
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </Card>
          <Card className={styles.card}>
            <InlineProductForm onAdd={setDataList} />
            <Divider />
            <InboundListEditor
              selectedWarehouseId={selectedWarehouse}
              dataList={dataList}
              setData={setDataList}
            />
            <div className={`${styles.bottomAction}`}>
              <Space size="middle">
                <Button>Bulk Input</Button>
                <Button>error log</Button>
              </Space>
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
