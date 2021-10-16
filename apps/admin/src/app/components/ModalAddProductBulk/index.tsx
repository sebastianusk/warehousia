import React, { Dispatch, SetStateAction } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Table } from 'antd';
import useModalAddProductBulkHooks, { ProductData } from './hooks';

import styles from './index.module.css';
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
    },
    {
      title: 'Nama Produk',
      dataIndex: 'name',
      key: 'name',
      editable: true,
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
    >
      <div className={styles.container}>
        <ExcelInput onDataInput={handleFile} />
        <Table
          columns={columns}
          dataSource={data}
          components={{ body: { row: EditableRow, cell: EditableCell } }}
        />
      </div>
    </Modal>
  );
}
