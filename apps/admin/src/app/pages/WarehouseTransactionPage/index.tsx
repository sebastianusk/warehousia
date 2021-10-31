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
          <h2 className={styles.title}>CREATE TRANSACTION</h2>
          <div>
            <div>Warehouse ID:</div>
            <WarehouseSelector />
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
      {selectedPrep && (
        <Card className={styles.card}>
          <h4>Created By: {selectedPrep?.createdBy}</h4>
          <h4>
            Created At:&nbsp;
            {new Date(selectedPrep?.createdAt!).toLocaleDateString('en-GB')}
          </h4>
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
      )}
    </>
  );
}
