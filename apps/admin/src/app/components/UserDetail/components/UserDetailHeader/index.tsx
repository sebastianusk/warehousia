import { useQuery } from '@apollo/client';
import { Card, Descriptions, PageHeader, Tag } from 'antd';
import { GET_ADMINS } from 'app/graph';
import React from 'react';
import {useHistory} from 'react-router-dom';

export default function UserDetailHeader(props: {
  id: string;
}): React.ReactElement {
  const { data } = useQuery(GET_ADMINS, {
    variables: { query: props.id, limit: 1 },
  });
  const history = useHistory();

  return data?.admins[0] ? (
    <Card>
      <PageHeader
        title={data.admins[0].username}
        onBack={() => history.push('/super-admin-menu')}
      />
      <Descriptions bordered column={1}>
        <Descriptions.Item label="User Name">
          {data.admins[0].username}
        </Descriptions.Item>
        <Descriptions.Item label="Role">
          {data.admins[0].role}
        </Descriptions.Item>
        <Descriptions.Item label="Warehouses">
          {data.admins[0].warehouses.map((warehouse: string) => (
            <Tag>{warehouse}</Tag>
          ))}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  ) : (
    <div />
  );
}
