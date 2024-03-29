import React from 'react';
import { Card, Divider, Button, Space, message } from 'antd';
import WarehouseSelector from 'app/components/WarehousesSelector';
import WarehouseSelectorTo from 'app/components/WarehousesSelectorTo';
import InlineProductForm from 'app/components/inlineProductForm';
import ListEditor from 'app/components/ListEditor';
import ExcelInput from 'app/components/ExcelInput';
import { useApolloClient } from '@apollo/client';
import { GET_PRODUCTS_BY_IDS } from 'app/graph';
import ErrorLogModal from 'app/components/ErrorLogModal';
import styles from './index.module.css';
import useTransferPageHooks from './hooks';

export default function WarehouseTransferPage(): React.ReactElement {
  const {
    warehouseFrom,
    warehouseTo,
    onAdd,
    transfer,
    error,
    setError,
    onSubmit,
  } = useTransferPageHooks();
  const client = useApolloClient();

  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <h2 className={styles.title}>TRANSFER</h2>
        </div>
        <Space size="middle" className="picker-container">
          <div>
            <div>From:</div>
            <WarehouseSelector feature="TRANSFER" />
          </div>
          <div>
            <div>To:</div>
            <WarehouseSelectorTo />
          </div>
        </Space>
      </Card>
      <Card className={styles.card}>
        <h3>Input Items to Transfer</h3>
        <InlineProductForm onAdd={onAdd} />
        <Divider />
        <ListEditor
          setData={transfer.set}
          dataList={transfer.data}
          selectedWarehouse={warehouseFrom}
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
                  setError(
                    notFound.map((item) => ({
                      id: item.id,
                      message: 'product not found',
                    }))
                  );
                  messageApi.error('item not found, check log');
                } else {
                  transfer.set(() => mergedList);
                  messageApi.info('upload complete');
                }
                return undefined;
              }}
            />
            <ErrorLogModal errors={error} />
          </Space>
          <Button
            size="large"
            type="primary"
            onClick={onSubmit}
            disabled={
              !warehouseTo ||
              !warehouseFrom ||
              transfer.data.length === 0 ||
              warehouseTo === warehouseFrom
            }
          >
            Submit
          </Button>
        </div>
      </Card>
      {contextHolder}
    </>
  );
}
