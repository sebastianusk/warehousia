import React, { ReactElement } from 'react';
import { Table } from 'antd';

const { Column } = Table;
type TablePrepProps = {
  data:
    | {
        productId: string;
        expected?: number;
        actual: number;
      }[]
    | undefined;
};
export default function TablePreparation({
  data,
}: TablePrepProps): ReactElement {
  return (
    <>
      <Table
        size="middle"
        dataSource={data}
        pagination={false}
        scroll={{ y: 400 }}
      >
        <Column title="Product Code" dataIndex="productId" key="productId" />
        <Column title="Amount" dataIndex="actual" key="actual" />
      </Table>
    </>
  );
}
