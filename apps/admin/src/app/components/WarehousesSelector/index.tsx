import React, { useContext } from 'react';

import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import UserContext from '../UserContext';

interface WarehouseSelectorProps {
  onSelectWarehouse: (warehouseId: string) => void;
}

export default function WarehouseSelector(
  props: WarehouseSelectorProps
): React.ReactElement {
  const user = useContext(UserContext);
  const menu = <Menu />;
  return (
    <Dropdown overlay={menu}>
      <Button>
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}
