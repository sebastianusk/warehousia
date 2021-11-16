import React from 'react';
import { Card, Space } from 'antd';
import WarehouseSelectorAll from 'app/components/WarehousesSelectorAll';
import WarehouseDemandTable from './components/WarehouseDemandTable';

import styles from './index.module.css';

export default function WarehouseDemandPage(): React.ReactElement {
  return (
    <div>
      <Card className={styles.card}>
        <div className={styles.flexContainer}>
          <h2 className={styles.title}>VIEW DEMAND</h2>
        </div>
        <Space size="middle" className="picker-container">
          <div>
            <div>Warehouse:</div>
            <WarehouseSelectorAll />
          </div>
        </Space>
      </Card>
      <WarehouseDemandTable />
    </div>
  );
}
