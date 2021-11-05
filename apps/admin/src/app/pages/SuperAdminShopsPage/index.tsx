import React from 'react';

import { AutoComplete, Button, Card, Input, Space, Table, Tag } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import ModalAddShop from 'app/components/ModalAddShop';
import styles from './index.module.css';
import useSuperAdminShopsHooks, { ShopItem } from './hooks';
import EditShopModal from './components/EditShopModal';

export default function SuperAdminShopsPage(): React.ReactElement {
  const {
    data,
    editData,
    setEditData,
    setShowModalAdd,
    showModalAdd,
    setQuery,
  } = useSuperAdminShopsHooks();
  return (
    <div>
      <Card className={styles.card}>
        <div className={styles.flexContainer}>
          <h2>SHOP LIST</h2>
          <Space>
            <Button onClick={() => setShowModalAdd(true)}>
              <PlusOutlined />
              Add New Shop
            </Button>
            <AutoComplete style={{ width: 200 }} onSearch={setQuery}>
              <Input.Search placeholder="search by name" />
            </AutoComplete>
          </Space>
        </div>
      </Card>
      <Card className={styles.card} loading={!data}>
        {data && (
          <Table
            size="middle"
            dataSource={data.map((item) => ({ ...item, key: item.id }))}
            pagination={false}
          >
            <Table.Column title="ID" dataIndex="id" key="id" />
            <Table.Column title="Shop Name" dataIndex="name" key="name" />
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
              title="Action"
              key="action"
              render={(_text, record: ShopItem) => (
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
      <EditShopModal setEditData={setEditData} editData={editData} />
      <ModalAddShop visible={showModalAdd} setVisible={setShowModalAdd} />
    </div>
  );
}
