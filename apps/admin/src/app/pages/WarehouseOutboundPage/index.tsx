import React, { ReactElement } from 'react';
import { useApolloClient } from '@apollo/client';
import { Card, Divider, Button, Space, message } from 'antd';
import { GET_PRODUCTS_BY_IDS } from 'app/graph';
import WarehouseSelector from 'app/components/WarehousesSelector';
import ShopsSelector from 'app/components/ShopsSelector';
import ListEditor from 'app/components/ListEditor';
import ErrorLogModal from 'app/components/ErrorLogModal';
import InlineProductForm from 'app/components/inlineProductForm';
import ExcelInput from 'app/components/ExcelInput';
import useOutboundHooks from './hooks';

import styles from './index.module.css';

export default function WarehouseOutboundPage(): ReactElement {
  const {
    selectedShop,
    setSelectedShop,
    selectedWarehouse,
    error,
    setError,
    onAdd,
    onSubmit,
    loading,
    outbound,
  } = useOutboundHooks();

  const client = useApolloClient();

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <h2 className={styles.title}>CREATE OUTBOUND</h2>
        </div>
        <Space size="middle" className="picker-container">
          <div>
            <div>From Warehouse:</div>
            <WarehouseSelector feature="OUTBOUND" />
          </div>
          <div>
            <div>For Shop:</div>
            <ShopsSelector onSelectShop={setSelectedShop} />
          </div>
        </Space>
      </Card>
      <Card className={styles.card}>
        <h3>Input Items To Outbound</h3>
        <InlineProductForm onAdd={onAdd} />
        <Divider />
        <ListEditor
          dataList={outbound.data}
          setData={outbound.set}
          selectedWarehouse={selectedWarehouse}
        />
        <div className={`${styles.bottomAction}`}>
          <Space size="middle">
            <ExcelInput
              onDataInput={async (data) => {
                const result = await client.query({
                  query: GET_PRODUCTS_BY_IDS,
                  variables: { ids: data.map((item) => item[0]) },
                });

                const mergedList = data.map((item) => {
                  const matchedProduct = result.data.getProductsByIds.find(
                    (product: any) => product.id === item[0]
                  );
                  return {
                    id: item[0],
                    name: matchedProduct?.name,
                    amount: parseInt(item[1], 10),
                    price: matchedProduct?.price,
                    stocks: matchedProduct?.stocks,
                  };
                });

                const notFound = mergedList.filter((item) => !item.name);
                if (notFound.length !== 0) {
                  setError(notFound.map((item) => ({ id: item.id })));
                  message.error('item not found, check log');
                } else {
                  outbound.set((prev) => [...prev, ...mergedList]);
                }
              }}
            />
            <ErrorLogModal
              errors={error.map((data) => ({
                ...data,
                message: 'product not found',
              }))}
            />
          </Space>
          <Button
            size="large"
            type="primary"
            disabled={
              !selectedShop || !selectedWarehouse || outbound.data.length === 0
            }
            onClick={onSubmit}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </Card>
    </>
  );
}
