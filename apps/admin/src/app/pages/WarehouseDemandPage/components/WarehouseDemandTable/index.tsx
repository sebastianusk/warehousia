import React from 'react';
import { Card, Table } from 'antd';

export default function WarehouseDemandTable(props: {
  warehouse: string;
}): React.ReactElement {
  return (
    <Card>
      <Table />
    </Card>
  );
}
