import React, { useContext, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, PageHeader, Spin, Table } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_STOCK } from 'app/graph';
import Column from 'antd/lib/table/Column';

import { useHistory } from 'react-router-dom';
import { GlobalContext } from 'app/components/GlobalState';
import styles from './index.module.css';
import ProductEditModal from '../ProductEditModal';
import ProductEditStockModal from '../ProductEditStockModal';

type DataEditStock = { warehouseId: string; amount: number };

export default function ProductDetailHeader(props: {
  productId: string;
}): React.ReactElement {
  const [modal, setModal] = useState(false);
  const [modalStock, setModalStock] = useState(false);
  const [dataModalStock, setDataModalStock] = useState({
    productId: '',
    warehouseId: '',
    amount: 0,
  });
  const { loading, data } = useQuery(GET_PRODUCT_STOCK, {
    variables: { productId: props.productId },
  });

  const item: {
    name: string;
    price: number;
    stocks: DataEditStock[];
  } = data?.productStock;

  const history = useHistory();

  const { userData } = useContext(GlobalContext);

  const onClickEdit = ({ warehouseId, amount }: DataEditStock) => {
    setDataModalStock({
      productId: props.productId,
      warehouseId,
      amount,
    });
    setModalStock(true);
  };

  return (
    <Card className={styles.card} key="header">
      {loading ? (
        <Spin size="large" />
      ) : (
        <div>
          {item ? (
            <ProductEditModal
              visible={modal}
              onCancel={() => setModal(false)}
              data={{
                id: props.productId,
                name: item.name,
                price: item.price,
              }}
            />
          ) : undefined}

          <div className={`${styles.flexContainer}`}>
            <PageHeader
              title={props.productId}
              onBack={() => history.push('/products')}
            />
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => setModal(true)}
            >
              Edit
            </Button>
          </div>
          <div style={{ margin: '30px 0px' }}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Price">
                {data.productStock.price}
              </Descriptions.Item>
              <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
            </Descriptions>
          </div>
          <Table
            dataSource={item?.stocks.map((stock) => ({
              ...stock,
              key: stock.warehouseId,
            }))}
            pagination={false}
          >
            <Column
              title="Warehouse"
              dataIndex="warehouseId"
              key="id"
              width="30%"
            />
            <Column
              title="Amount"
              dataIndex="amount"
              key="amount"
              width="30%"
            />
            {userData.userData?.role === 'SUPER_ADMIN' ? (
              <Column
                title="Edit"
                key="edit"
                render={(
                  _text: any,
                  { warehouseId, amount }: DataEditStock
                ) => (
                  <a
                    onClick={() => {
                      onClickEdit({ warehouseId, amount });
                    }}
                    role="presentation"
                  >
                    Edit
                  </a>
                )}
              />
            ) : undefined}
          </Table>
          <ProductEditStockModal
            visible={modalStock}
            setVisible={setModalStock}
            dataToEdit={dataModalStock}
            key={dataModalStock.warehouseId}
          />
        </div>
      )}
    </Card>
  );
}
