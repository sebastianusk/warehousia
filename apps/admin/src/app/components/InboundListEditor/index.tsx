import React, { useEffect } from 'react';
import { Table, Popconfirm } from 'antd';
import {
  EditableTableProps,
  ColumnTypes,
  EditableRow,
  EditableCell,
} from '../EditableTable';
import { DataList } from '../../pages/WarehouseInboundPage/hooks';

type DataType = {
  id: string;
  name: string;
  amount: number;
};

function InboundListEditor(
  props: EditableTableProps & {
    selectedWarehouseId: string | undefined;
    dataList: DataList;
    setData: React.Dispatch<React.SetStateAction<DataList>>;
  }
) {
  const handleSave = (row: DataType) => {
    const newData = props.dataList.map((datum) => {
      if (datum.id === row.id) {
        return row;
      }
      return datum;
    });
    props.setData(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = [
    {
      title: 'Product Code',
      dataIndex: 'id',
      width: '15%',
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      editable: true,
      onCell: (record: DataType, index: number) => ({
        record,
        editable: true,
        dataIndex: 'amount',
        title: 'Amount',
        handleSave,
      }),
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: () =>
        props.dataList.length >= 1 ? (
          <>
            <Popconfirm title="Sure to delete?">
              <a>Delete</a>
            </Popconfirm>
          </>
        ) : null,
    },
  ];

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={props.dataList}
        columns={columns as ColumnTypes}
        {...props}
      />
    </div>
  );
}
export default InboundListEditor;
