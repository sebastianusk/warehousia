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
      <Table size="middle" dataSource={data}>
        <Column title="Product Code" dataIndex="productId" key="productId" />
        {/* <Column
          title="Product Name"
          dataIndex="productName"
          key="productName"
        /> */}
        <Column title="Amount" dataIndex="actual" key="actual" />
      </Table>
    </>
  );
}
