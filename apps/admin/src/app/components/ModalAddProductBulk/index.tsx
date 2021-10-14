import React, { Dispatch, SetStateAction } from 'react';
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
  setVisible: Dispatch<SetStateAction<boolean>>;
}): React.ReactElement {
  const { handleFile, data, loading } = useModalAddProductBulkHooks(
    props.setVisible
  );
  return (
    <Modal
      visible={props.visible}
      onCancel={() => props.setVisible(false)}
      okButtonProps={{ disabled: data.length === 0 }}
    >
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

function setVisible(setVisible: any): {handleFile: any; data: any; loading: any;} {
  throw new Error('Function not implemented.');
}
