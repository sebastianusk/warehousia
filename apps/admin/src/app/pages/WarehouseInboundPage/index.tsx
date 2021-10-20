import React, { ReactElement } from 'react';
import { Menu, Card, Divider, Button, Space } from 'antd';
import WarehouseSelector from 'app/components/WarehousesSelector';
import styles from './index.module.css';
import InlineProductForm from '../../components/inlineProductForm';
import InboundListEditor from '../../components/InboundListEditor';
import useInboundHooks from './hooks';
import UserContext from '../../components/UserContext';

export default function WarehouseInboundPage(): ReactElement {
  const { selectedWarehouse, dataList, setDataList, onSubmit, loading, onAdd } =
    useInboundHooks();

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <h2 className={styles.title}>INBOUND</h2>
          <WarehouseSelector onSelectWarehouse={() => {}} />
        </div>
      </Card>
      <Card className={styles.card}>
        <InlineProductForm onAdd={onAdd} />
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
  );
}
