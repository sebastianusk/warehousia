import React, { ReactElement } from 'react';
import { Card, Col, Row, Tag } from 'antd';
import useUserListHook from './hooks';
import styles from './index.module.css';

type UsersListProps = {
  data: UsersListType;
};

type UsersListType = {
  username: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  warehouses: string[];
  active: boolean;
}[];

export default function UsersList({ data }: UsersListProps): ReactElement {
  const { placeholder } = useUserListHook();

  return (
    <Row gutter={16}>
      {data.map((user) => (
        <Col span={8} key={user.username}>
          <Card className={styles.cardUser}>
            <h4>{user.username}</h4>
            <h5>{user.role}</h5>
            <div>
              {user.warehouses.map((warehouse) => (
                <Tag key={warehouse}>{warehouse}</Tag>
              ))}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
