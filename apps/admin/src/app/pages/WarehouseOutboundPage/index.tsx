import React, { ReactElement } from 'react';
import { Card, Divider, Button, Space } from 'antd';
import WarehouseSelector from 'app/components/WarehousesSelector';
import ShopsSelector from 'app/components/ShopsSelector';
import InboundListEditor from 'app/components/InboundListEditor';
import InlineProductForm from 'app/components/inlineProductForm';
import useOutboundHooks from './hooks';

import styles from './index.module.css';

export default function WarehouseOutboundPage(): ReactElement {
  const {
    setSelectedShop,
    setSelectedWarehouse,
    onAdd,
    onSubmit,
    loading,
    dataList,
    setDataList,
  } = useOutboundHooks();

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <h2 className={styles.title}>OUTBOUND</h2>
        </div>
        <Space size="middle" className={styles.warehousePicker}>
          <span>FROM</span>
          <WarehouseSelector onSelectWarehouse={setSelectedWarehouse} />
          <span>FOR</span>
          <ShopsSelector onSelectShop={setSelectedShop} />
        </Space>
      </Card>
      <Card className={styles.card}>
        <h3>Input Order</h3>
        <InlineProductForm onAdd={onAdd} />
        <Divider />
        <InboundListEditor dataList={dataList} setData={setDataList} />
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
  );
}
