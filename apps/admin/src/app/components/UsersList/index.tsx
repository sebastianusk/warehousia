import React, { ReactElement } from 'react';
import { Card, Col, Row, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import useUserListHook from './hooks';
import styles from './index.module.css';
import ModalEditUser from '../ModalEditUser';

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
  const { onClickEdit, showModalEdit, setShowModalEdit, dataToEdit } =
    useUserListHook();

  return (
    <>
      <ModalEditUser
        visible={showModalEdit}
        setVisible={setShowModalEdit}
        userData={dataToEdit}
      />
      <Row gutter={16}>
        {data.map((user) => (
          <Col span={8} key={user.username}>
            <div
              onClick={() => onClickEdit(user)}
              onKeyUp={() => onClickEdit(user)}
              role="button"
              tabIndex={0}
              className={styles.editButton}
            >
              <EditOutlined style={{ color: '#000' }}/>
            </div>
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
    </>
  );
}
