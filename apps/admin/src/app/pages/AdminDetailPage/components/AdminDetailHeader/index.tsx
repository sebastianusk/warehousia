import { Button, Card, Descriptions, PageHeader, Tag } from 'antd';
import ModalEditUser from 'app/components/ModalEditUser';
import React from 'react';
import { useHistory } from 'react-router-dom';
import useAdminDetailHeaderHooks from './hooks';

import styles from './index.module.css';

export default function AdminDetailHeader(props: {
  id: string;
}): React.ReactElement {
  const { data, editUser, setEditUser } = useAdminDetailHeaderHooks(props.id);
  const history = useHistory();

  return data ? (
    <Card className={styles.card}>
      <div className={styles.header}>
        <PageHeader
          className={styles.title}
          title={data.username}
          onBack={() => history.push('/super-admin-admins')}
        />
        <Button className={styles.button} onClick={() => setEditUser(true)}>
          Edit Admin
        </Button>
        <ModalEditUser
          visible={editUser}
          userData={data}
          setVisible={setEditUser}
          key="editUser"
        />
      </div>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="User Name">{data.username}</Descriptions.Item>
        <Descriptions.Item label="Role">{data.role}</Descriptions.Item>
        <Descriptions.Item label="Warehouses">
          {data.warehouses.map((warehouse: string) => (
            <Tag>{warehouse}</Tag>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Active">
          {data.active === true ? (
            <Tag color="green" key="status-active">
              Active
            </Tag>
          ) : (
            <Tag color="grey" key="status-inactive">
              Inactive
            </Tag>
          )}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  ) : (
    <div />
  );
}
