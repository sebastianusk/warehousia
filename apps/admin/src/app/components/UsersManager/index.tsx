import React, { ReactElement } from 'react';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UsersList from '../UsersList';
import ModalAddUser from '../ModalAddUser';
import styles from './index.module.css';
import useUsersManagerHooks from './hooks';

export default function UsersManager(): ReactElement {
  const { showModalAdd, setShowModalAdd, loading, error, data } =
    useUsersManagerHooks();

  return (
    <>
      <Card className={styles.container}>
        <div className={`${styles.flexContainer}`}>
          <h2>USER LIST</h2>
          <div>
            <Button
              className={styles.buttonAddOne}
              onClick={() => setShowModalAdd(true)}
            >
              <PlusOutlined />
              Add New User
            </Button>
          </div>
        </div>
      </Card>
      <Card className={styles.card}>{data && <UsersList data={data} />}</Card>
      <ModalAddUser visible={showModalAdd} setVisible={setShowModalAdd} />
    </>
  );
}
