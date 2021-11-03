import React from 'react';

import { Button, Card, Input, Space, Table, Tag } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import ModalAddWarehouse from 'app/components/ModalAddWarehouse';
import styles from './index.module.css';
import useSuperAdminWarehouseHooks, { WarehouseItem } from './hooks';
import EditWarehouseModal from './components/EditWarehouseModal';

export default function SuperAdminWarehousePage(): React.ReactElement {
  const { data, editData, setEditData, setShowModalAdd, showModalAdd } =
    useSuperAdminWarehouseHooks();
  return (
    <div>
      <Card className={styles.card}>
        <div className={styles.flexContainer}>
          <h2>WAREHOUSE LIST</h2>
          <div>
            <Button onClick={() => setShowModalAdd(true)}>
              <PlusOutlined />
              Add New Warehouse
            </Button>
            <Input.Search placeholder="search by name" style={{ width: 200 }} />
          </div>
        </div>
      </Card>
      <Card className={styles.card}>
        {data && (
          <Table
            size="middle"
            dataSource={data.map((item) => ({ ...item, key: item.id }))}
          >
            <Table.Column title="ID" dataIndex="id" key="id" />
            <Table.Column title="Warehouse Name" dataIndex="name" key="name" />
            <Table.Column
              title="Status"
              dataIndex="active"
              key="active"
              render={(status) => (
                <>
                  {status === true ? (
                    <Tag color="green" key="status-active">
                      Active
                    </Tag>
                  ) : (
                    <Tag color="grey" key="status-inactive">
                      Inactive
                    </Tag>
                  )}
                </>
              )}
            />
            <Table.Column
              title="Features"
              dataIndex="features"
              key="features"
              render={(features) => (
                <>
                  {features.map((feat: any) => (
                    <Tag color="geekblue" key={feat}>
                      {feat}
                    </Tag>
                  ))}
                </>
              )}
            />
            <Table.Column
              title="Action"
              key="action"
              render={(_text, record: WarehouseItem) => (
                <Space size="middle">
                  <Button
                    size="small"
                    icon={<EditOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditData(record);
                    }}
                  >
                    Edit
                  </Button>
                </Space>
              )}
            />
          </Table>
        )}
      </Card>
      <EditWarehouseModal setEditData={setEditData} editData={editData} />
      <ModalAddWarehouse visible={showModalAdd} setVisible={setShowModalAdd} />
    </div>
  );
}
