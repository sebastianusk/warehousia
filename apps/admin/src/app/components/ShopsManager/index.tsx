import React, { ReactElement } from 'react';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ShopsList from '../ShopsList';
import ModalAddShop from '../ModalAddShop';
import styles from './index.module.css';
import useShopsManagerHooks from './hooks';

export default function ShopsManager(): ReactElement {
  const { showModalAdd, setShowModalAdd, loading, error, data } =
    useShopsManagerHooks();

  if (loading) return <p>Loading,,,</p>;
  if (error) console.log(error);

  return (
    <>
      <Card className={styles.container}>
        <div className={`${styles.flexContainer}`}>
          <h2>SHOP LIST</h2>
          <div>
            <Button
              className={styles.buttonAddOne}
              onClick={() => setShowModalAdd(true)}
            >
              <PlusOutlined />
              Add New Shop
            </Button>
          </div>
        </div>
      </Card>
      <Card className={styles.card}>{data && <ShopsList data={data} />}</Card>
      <ModalAddShop visible={showModalAdd} setVisible={setShowModalAdd} />
    </>
  );
}
