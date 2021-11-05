import React from 'react';

import { Button, Card, Input, Space, Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalAddUser from 'app/components/ModalAddUser';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import useSuperAdminHooks, { AdminItem } from './hooks';

export default function SuperAdminPage(): React.ReactElement {
  const { data, setShowModalAdd, showModalAdd, setQuery } =
    useSuperAdminHooks();
  const history = useHistory();
  return (
    <div>
      <Card className={styles.card}>
        <div className={styles.flexContainer}>
          <h2>ADMIN LIST</h2>
          <div>
            <Button onClick={() => setShowModalAdd(true)}>
              <PlusOutlined />
              Add New Admin
            </Button>
            <Input.Search
              placeholder="search by name"
              style={{ width: 200 }}
              onSearch={setQuery}
            />
          </div>
        </div>
      </Card>
      <Card className={styles.card} loading={!data}>
        {data && (
          <Table
            size="middle"
            dataSource={data.map((item) => ({ ...item, key: item.username }))}
            pagination={false}
          >
            <Table.Column title="ID" dataIndex="username" key="username" />
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
              title="Warehouse"
              dataIndex="warehouses"
              key="warehouses"
              render={(warehouses) => (
                <>
                  {warehouses.map((feat: any) => (
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
              render={(_text, record: AdminItem) => (
                <Space size="middle">
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(`/admin-detail/${record.username}`);
                    }}
                  >
                    View
                  </Button>
                </Space>
              )}
            />
          </Table>
        )}
      </Card>
      <ModalAddUser visible={showModalAdd} setVisible={setShowModalAdd} />
    </div>
  );
}
