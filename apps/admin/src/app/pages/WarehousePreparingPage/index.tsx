import React, { ReactElement } from 'react';
import { Card, Button, Checkbox } from 'antd';

import WarehouseSelector from 'app/components/WarehousesSelector';
import TablePreparation from '../../components/TablePreparation';
import usePreparingHooks from './hooks';

import styles from './index.module.css';

export default function WarehousePreparingPage(): ReactElement {
  const {
    selectedWarehouse,
    onSelectWarehouse,
    onSubmit,
    loading,
    shopsOption,
    selectedShops,
    onChangeSelectShops,
    dataSource,
  } = usePreparingHooks();

  return (
    <>
      <Card className={styles.card}>
        <div>
          <h2 className={styles.title}>CREATE PREPARING</h2>
          <div className={styles.flexContainer}>
            <div>
              <div>Warehouse ID:</div>
              <WarehouseSelector onSelectWarehouse={onSelectWarehouse} />
            </div>
            <div className={styles.shopSelectorContainer}>
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
        </div>
      </Card>
      <Card className={styles.card}>
        <TablePreparation data={dataSource} />
        <div className={styles.bottomAction}>
          <Button
            size="large"
            type="primary"
            onClick={onSubmit}
            loading={loading}
            disabled={
              selectedShops.length < 1 ||
              !selectedWarehouse ||
              dataSource.length < 1
            }
          >
            Submit
          </Button>
        </div>
      </Card>
    </>
  );
}
