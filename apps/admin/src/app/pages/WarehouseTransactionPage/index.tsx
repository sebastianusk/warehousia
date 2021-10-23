import React, { ReactElement } from 'react';
import { Card, Button } from 'antd';
import WarehouseSelector from 'app/components/WarehousesSelector';
import TablePreparation from 'app/components/TablePreparation';
import PreparationsSelector from 'app/components/PreparationsSelector';
import useTransactionHooks from './hooks';
import styles from './index.module.css';

export default function WarehouseTransactionPage(): ReactElement {
  const {
    selectedWarehouse,
    onSelectWarehouse,
    dataSource,
    selectedPrep,
    onSelectPreparation,
    loading,
    onSubmit,
  } = useTransactionHooks();

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <h2 className={styles.title}>TRANSACTION</h2>
          <div>
            <div>Warehouse ID:</div>
            <WarehouseSelector onSelectWarehouse={onSelectWarehouse} />
          </div>
          <div className={styles.prepSelector}>
            <div>Preparation ID:</div>
            <PreparationsSelector
              onSelectPrep={onSelectPreparation}
              dataSource={dataSource}
            />
          </div>
        </div>
      </Card>
      <Card className={styles.card}>
        <TablePreparation data={selectedPrep?.items} />
        <div className={`${styles.bottomAction}`}>
          <Button
            size="large"
            type="primary"
            onClick={onSubmit}
            loading={loading}
            disabled={!selectedWarehouse || !selectedPrep}
          >
            Submit
          </Button>
        </div>
      </Card>
    </>
  );
}
