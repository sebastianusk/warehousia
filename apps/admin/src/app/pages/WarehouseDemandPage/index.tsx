import React, { useState } from 'react';
import { Card } from 'antd';
import WarehouseSelector from 'app/components/WarehousesSelector';
import WarehouseDemandTable from './components/WarehouseDemandTable';

import styles from './index.module.css';

export default function WarehouseDemandPage(): React.ReactElement {
  const [warehouse, setWarehouse] = useState<string | undefined>();
  return (
    <div>
      <Card className={styles.card}>
        <div className={styles.flexContainer}>
          <h2 className={styles.title}>DEMAND</h2>
          <WarehouseSelector onSelectWarehouse={setWarehouse} />
        </div>
      </Card>
      {warehouse ? (
        <WarehouseDemandTable warehouse={warehouse} shopId="shopee1" />
      ) : (
        <div />
      )}
    </div>
  );
}
