import React from 'react';
import { Card, Divider, Button, Space } from 'antd';
import WarehouseSelector from 'app/components/WarehousesSelector';
import ExcelInput from 'app/components/ExcelInput';
import styles from './index.module.css';
import InlineProductForm from '../../components/inlineProductForm';
import InboundListEditor from '../../components/InboundListEditor';
import useInboundHooks from './hooks';

export default function WarehouseInboundPage(): React.ReactElement {
  const {
    setSelectedWarehouse,
    dataList,
    setDataList,
    onSubmit,
    loading,
    onAdd,
  } = useInboundHooks();

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <h2 className={styles.title}>INBOUND</h2>
          <WarehouseSelector onSelectWarehouse={setSelectedWarehouse} />
        </div>
      </Card>
      <Card className={styles.card}>
        <InlineProductForm onAdd={onAdd} />
        <Divider />
        <InboundListEditor dataList={dataList} setData={setDataList} />
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
