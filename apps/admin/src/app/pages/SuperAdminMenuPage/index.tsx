import React, { ReactElement } from 'react';
import { Button, Input, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import ModalAddWarehouse from '../../components/ModalAddWarehouse';
import useSuperAdminMenuHooks from './hooks';
import WarehouseTable from '../../components/WarehousesTable';
import UsersManager from '../../components/UsersManager';
import ShopsManager from '../../components/ShopsManager';

export default function SuperAdminMenuPage(): ReactElement {
  const { showModalAdd, setShowModalAdd, loading, error, data, onSearch } =
    useSuperAdminMenuHooks();

  if (loading) return <p>Loading...</p>;
  if (error) console.log(error);

  return (
    <>
      <Card className={styles.cardTitle}>
        <div className={`${styles.flexContainer}`}>
          <h2>WAREHOUSE LIST</h2>
          <div>
            <Button
              className={styles.buttonAddOne}
              onClick={() => setShowModalAdd(true)}
            >
              <PlusOutlined />
              Add New Warehouse
            </Button>
            <Input.Search
              onSearch={onSearch}
              placeholder="search by name"
              style={{ width: 200 }}
            />
          </div>
        </div>
      </Card>
      <Card className={styles.card}>
        {data && <WarehouseTable data={data} />}
      </Card>
      <ModalAddWarehouse visible={showModalAdd} setVisible={setShowModalAdd} />
      <UsersManager />
      <ShopsManager />
    </>
  );
}
