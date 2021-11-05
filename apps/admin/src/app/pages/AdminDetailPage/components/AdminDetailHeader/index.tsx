import { useQuery } from '@apollo/client';
import { Card, Descriptions, PageHeader, Tag } from 'antd';
import { GET_ADMINS } from 'app/graph';
import React from 'react';
import { useHistory } from 'react-router-dom';
import useAdminDetailHeaderHooks from './hooks';

import styles from './index.module.css';

export default function AdminDetailHeader(props: {
  id: string;
}): React.ReactElement {
  const { data } = useAdminDetailHeaderHooks(props.id);
  const history = useHistory();

  return data ? (
    <Card className={styles.card}>
      <PageHeader
        title={data.username}
        onBack={() => history.push('/super-admin-admins')}
      />
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
