import React, { ReactElement } from 'react';
import { Button, Input, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import ModalAddWarehouse from '../../components/ModalAddWarehouse';
import useSuperAdminMenuHooks from './hooks';
import WarehouseTable from '../../components/WarehousesTable';

export default function SuperAdminMenuPage(): ReactElement {
  const { showModalAdd, setShowModalAdd, loading, error, data, onSearch } =
    useSuperAdminMenuHooks();

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <h2>WAREHOUSE LIST</h2>
          <div>
            <Button
              className={styles.buttonAddOne}
              onClick={() => setShowModalAdd(true)}
            >
              <PlusOutlined />
              Add New
            </Button>
            <Input.Search
              placeholder="search by name"
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </div>
        </div>
      </Card>
      <Card className={styles.card}>
        <WarehouseTable />
      </Card>
      <ModalAddWarehouse visible={showModalAdd} setVisible={setShowModalAdd} />
    </>
  );
}
