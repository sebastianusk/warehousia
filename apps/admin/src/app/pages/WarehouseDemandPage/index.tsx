import React, { useState } from 'react';
import { Card } from 'antd';
import WarehouseSelectorAll from 'app/components/WarehousesSelectorAll';
import ShopsSelector from 'app/components/ShopsSelector';
import WarehouseDemandTable from './components/WarehouseDemandTable';

import styles from './index.module.css';

export default function WarehouseDemandPage(): React.ReactElement {
  const [shop, setShop] = useState<string | undefined>();
  return (
    <div>
      <Card className={styles.card}>
        <div className={styles.flexContainer}>
          <h2 className={styles.title}>VIEW DEMAND</h2>
          <WarehouseSelectorAll />
          <ShopsSelector onSelectShop={setShop} />
        </div>
      </Card>
      {shop ? <WarehouseDemandTable shopId={shop} /> : <div />}
    </div>
  );
}
