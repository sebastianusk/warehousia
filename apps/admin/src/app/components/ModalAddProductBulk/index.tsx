import React from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import useModalAddProductBulkHooks, { ProductData } from './hooks';

import styles from './index.module.css';

const columns: ColumnType<ProductData>[] = [
  {
    title: 'Kode Produk',
    dataIndex: 'productCode',
  },
  {
    title: 'Nama Produk',
    dataIndex: 'productName',
  },
];

export default function ModalAddProductBulk(props: {
  visible: boolean;
}): React.ReactElement {
  const { handleFile, data, loading } = useModalAddProductBulkHooks();
  return (
    <Modal visible={props.visible}>
      <div className={styles.container}>
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={(event) => {
            const { files } = event.target;
            if (files && files[0]) handleFile(files[0]);
          }}
        />
        <Table columns={columns} loading={loading} dataSource={data} />
      </div>
    </Modal>
  );
}
