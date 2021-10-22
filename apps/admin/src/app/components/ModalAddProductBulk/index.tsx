import React, { Dispatch, SetStateAction } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Table } from 'antd';
import useModalAddProductBulkHooks, { ProductData } from './hooks';

import {
  EditableRow,
  EditableCell,
  EditableColumnTypes,
  mapEditableColumn,
} from '../EditableTable';
import ExcelInput from '../ExcelInput';

export default function ModalAddProductBulk(props: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}): React.ReactElement {
  const { handleFile, data, setData, loading, uploadData } =
    useModalAddProductBulkHooks(props.setVisible);
  const columns: EditableColumnTypes<ProductData>[] = [
    {
      title: 'Kode Produk',
      dataIndex: 'id',
      key: 'id',
      editable: true,
      width: 150,
    },
    {
      title: 'Nama Produk',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      width: 300,
    },
    {
      title: 'Harga',
      dataIndex: 'price',
      key: 'price',
      editable: true,
      width: 150,
    },
  ].map(
    mapEditableColumn((record: EditableColumnTypes<ProductData>) => {
      const newData = Array.from(data);
      const index = newData.findIndex((item) => record.id === item.id);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...record,
      });
      setData(newData);
    })
  );
  return (
    <Modal
      visible={props.visible}
      onCancel={() => props.setVisible(false)}
      onOk={uploadData}
      okButtonProps={{ disabled: data.length === 0, loading }}
      width={700}
    >
      <div>
        <ExcelInput onDataInput={handleFile} />
        <Table
          columns={columns}
          dataSource={data}
          components={{ body: { row: EditableRow, cell: EditableCell } }}
          pagination={false}
          scroll={{ y: 500 }}
        />
      </div>
    </Modal>
  );
}
