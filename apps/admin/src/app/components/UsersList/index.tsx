import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Col, Row, Tag } from 'antd';
import { EditOutlined, RightOutlined } from '@ant-design/icons';

import useUserListHook from './hooks';
import styles from './index.module.css';
import ModalEditUser from '../ModalEditUser';

type UsersListProps = {
  data: UsersListType;
};

type UsersListType = {
  username: string;
  role: 'ADMIN' | 'SUPER_ADMIN' | 'ADMIN_MANAGER';
  warehouses: string[];
  active: boolean;
}[];

export default function UsersList({
  data,
}: UsersListProps): React.ReactElement {
  const { onClickEdit, showModalEdit, setShowModalEdit, dataToEdit } =
    useUserListHook();
  const history = useHistory();

  return (
    <>
      <ModalEditUser
        visible={showModalEdit}
        setVisible={setShowModalEdit}
        userData={dataToEdit}
        key={dataToEdit.username}
      />
      <Row gutter={16}>
        {data.map((user) => (
          <Col span={8} key={user.username}>
            <Card className={styles.cardUser}>
              <div className={styles.userContainer}>
                <div className={styles.userInfo}>
                  <h4>{user.username}</h4>
                  <h5>{user.role}</h5>
                  <div>
                    {user.warehouses.map((warehouse) => (
                      <Tag key={warehouse} className={styles.tag}>
                        {warehouse}
                      </Tag>
                    ))}
                  </div>
                </div>
                <div className={styles.userAction}>
                  <div
                    onClick={() => onClickEdit(user)}
                    onKeyUp={() => onClickEdit(user)}
                    role="button"
                    tabIndex={0}
                    className={styles.userIcon}
                  >
                    <EditOutlined style={{ color: '#000' }} />
                  </div>
                  <div
                    className={styles.userIcon}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      history.push(`/admin-detail/${user.username}`);
                    }}
                    onKeyUp={() => {
                      history.push(`/admin-detail/${user.username}`);
                    }}
                  >
                    <RightOutlined />
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
