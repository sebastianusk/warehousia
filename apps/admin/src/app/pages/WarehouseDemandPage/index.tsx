import React, { useState } from 'react';
import { Card } from 'antd';
import WarehouseSelector from 'app/components/WarehousesSelector';
import ShopsSelector from 'app/components/ShopsSelector';
import WarehouseDemandTable from './components/WarehouseDemandTable';

import styles from './index.module.css';

export default function WarehouseDemandPage(): React.ReactElement {
  const [warehouse, setWarehouse] = useState<string | undefined>();
  const [shop, setShop] = useState<string | undefined>();
  return (
    <div>
      <Card className={styles.card}>
        <div className={styles.flexContainer}>
          <h2 className={styles.title}>VIEW DEMAND</h2>
          <WarehouseSelector onSelectWarehouse={setWarehouse} />
          <ShopsSelector onSelectShop={setShop} />
        </div>
      </Card>
      {warehouse && shop ? (
        <WarehouseDemandTable warehouse={warehouse} shopId={shop} />
      ) : (
        <div />
      )}
    </div>
  );
}
