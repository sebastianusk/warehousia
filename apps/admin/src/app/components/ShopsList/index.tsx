import React, { ReactElement } from 'react';
import { Card, Col, Row, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import useShopsListHook from './hooks';
import styles from './index.module.css';
import ModalEditShop from '../ModalEditShop';
import { ShopData } from '../ShopsManager/Types';

type ShopsListProps = {
  data: ShopData[];
};

export default function ShopsList({ data }: ShopsListProps): ReactElement {
  const { onClickEdit, showModalEdit, setShowModalEdit, dataToEdit } =
    useShopsListHook();

  return (
    <>
      <ModalEditShop
        visible={showModalEdit}
        setVisible={setShowModalEdit}
        shopData={dataToEdit}
      />
      <Row gutter={16}>
        {data.map((shop) => (
          <Col span={8} key={shop.id}>
            <div
              onClick={() => onClickEdit(shop)}
              onKeyUp={() => onClickEdit(shop)}
              role="button"
              tabIndex={0}
              className={styles.editButton}
            >
              <EditOutlined />
            </div>
            <Card className={styles.cardShop}>
              <p>{shop.id}</p>
              <h4>{shop.name}</h4>
              <div>
                {shop.active ? (
                  <Tag color="green">Active</Tag>
                ) : (
                  <Tag color="grey">Inactive</Tag>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
