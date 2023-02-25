import React from 'react';
import { Table, Popconfirm } from 'antd';
import {
  EditableTableProps,
  ColumnTypes,
  EditableRow,
  EditableCell,
} from '../EditableTable';
import { DataList, Data } from '../GlobalState';
import StockCell from '../StockCell';

function ListEditor(
  props: EditableTableProps & {
    dataList: DataList;
    setData: React.Dispatch<React.SetStateAction<DataList>>;
    selectedWarehouse?: string;
  }
) {
  const handleSave = (row: Data) => {
    const newData = props.dataList.map((datum) => {
      if (datum.id === row.id) {
        return {
          ...row,
          amount: Number(row.amount),
        };
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
      title: 'Current WH Stock',
      dataIndex: 'Stock',
      render: (_text: any, record: Data) => (
        <StockCell
          stocksData={record.stocks}
          warehouseId={props.selectedWarehouse}
          dataToShow="stock"
        />
      ),
    },
    {
      title: 'Total Stock',
      dataIndex: 'Stock',
      render: (_text: any, record: Data) => (
        <StockCell
          stocksData={record.stocks}
          warehouseId={props.selectedWarehouse}
          dataToShow="total"
        />
      ),
    },
    {
      title: 'Add Amount',
      dataIndex: 'amount',
      editable: true,
      onCell: (record: Data) => ({
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
      render: (_text: any, _record: Data, index: number) =>
        props.dataList.length >= 1 ? (
          <>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                const copy = Array.from(props.dataList);
                copy.splice(index, 1);
                props.setData(copy);
              }}
            >
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
        dataSource={props.dataList.map((item) => ({ ...item, key: item.id }))}
        columns={columns as ColumnTypes}
        pagination={false}
        scroll={{ y: 400 }}
        {...props}
      />
    </div>
  );
}
export default ListEditor;

ListEditor.defaultProps = {
  selectedWarehouse: '',
};
