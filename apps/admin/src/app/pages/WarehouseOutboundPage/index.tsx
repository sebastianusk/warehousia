import React, { ReactElement } from 'react';
import { Card, Divider, Button, Space } from 'antd';
import WarehouseSelector from 'app/components/WarehousesSelector';
import ShopsSelector from 'app/components/ShopsSelector';
import ListEditor from 'app/components/ListEditor';
import InlineProductForm from 'app/components/inlineProductForm';
import ExcelInput from 'app/components/ExcelInput';
import useOutboundHooks from './hooks';

import styles from './index.module.css';

export default function WarehouseOutboundPage(): ReactElement {
  const {
    selectedShop,
    setSelectedShop,
    selectedWarehouse,
    onAdd,
    onSubmit,
    loading,
    outbound,
  } = useOutboundHooks();

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <h2 className={styles.title}>CREATE OUTBOUND</h2>
        </div>
        <Space size="middle" className="picker-container">
          <div>
            <div>From Warehouse:</div>
            <WarehouseSelector feature="OUTBOUND" />
          </div>
          <div>
            <div>For Shop:</div>
            <ShopsSelector onSelectShop={setSelectedShop} />
          </div>
        </Space>
      </Card>
      <Card className={styles.card}>
        <h3>Input Items To Outbound</h3>
        <InlineProductForm onAdd={onAdd} />
        <Divider />
        <ListEditor
          dataList={outbound.data}
          setData={outbound.set}
          selectedWarehouse={selectedWarehouse}
        />
        <div className={`${styles.bottomAction}`}>
          <Space size="middle">
            <ExcelInput
              onDataInput={async (data) => {
                const result = data.map((item) => ({
                  id: item[0],
                  name: '',
                  amount: parseInt(item[1], 10),
                }));
                outbound.set((prev) => [...prev, ...result]);
              }}
            />
            <Button>Error log</Button>
          </Space>
          <Button
            size="large"
            type="primary"
            disabled={
              !selectedShop || !selectedWarehouse || outbound.data.length === 0
            }
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
