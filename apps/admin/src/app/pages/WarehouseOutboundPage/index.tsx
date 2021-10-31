import React, { ReactElement } from 'react';
import { Card, Divider, Button, Space } from 'antd';
import WarehouseSelector from 'app/components/WarehousesSelector';
import ShopsSelector from 'app/components/ShopsSelector';
import InboundListEditor from 'app/components/InboundListEditor';
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
    dataList,
    setDataList,
  } = useOutboundHooks();

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <h2 className={styles.title}>CREATE OUTBOUND</h2>
        </div>
        <Space size="middle" className={styles.warehousePicker}>
          <span>FROM</span>
          <WarehouseSelector feature="OUTBOUND" />
          <span>FOR</span>
          <ShopsSelector onSelectShop={setSelectedShop} />
        </Space>
      </Card>
      <Card className={styles.card}>
        <h3>Input Order</h3>
        <InlineProductForm onAdd={onAdd} />
        <Divider />
        <InboundListEditor
          dataList={dataList}
          setData={setDataList}
          selectedWarehouse={selectedWarehouse}
        />
        <div className={`${styles.bottomAction}`}>
          <Space size="middle">
            <ExcelInput
              onDataInput={(data) => {
                const result = data.map((item) => ({
                  id: item[0],
                  name: '',
                  amount: parseInt(item[1], 10),
                }));
                setDataList([...dataList, ...result]);
              }}
            />
            <Button>Error log</Button>
          </Space>
          <Button
            size="large"
            type="primary"
            disabled={
              !selectedShop || !selectedWarehouse || dataList.length === 0
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
