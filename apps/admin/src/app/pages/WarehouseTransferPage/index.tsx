import React from 'react';
import { Card, Divider, Button, Space, message } from 'antd';
import WarehouseSelector from 'app/components/WarehousesSelector';
import WarehouseSelectorTo from 'app/components/WarehousesSelectorTo';
import InlineProductForm from 'app/components/inlineProductForm';
import ListEditor from 'app/components/ListEditor';
import ExcelInput from 'app/components/ExcelInput';
import { useApolloClient } from '@apollo/client';
import { SEARCH_PRODUCT } from 'app/graph';
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

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <h2 className={styles.title}>TRANSFER</h2>
        </div>
        <Space size="middle" className={styles.warehousePicker}>
          <span>FROM</span>
          <WarehouseSelector feature="TRANSFER" />
          <span>TO</span>
          <WarehouseSelectorTo />
        </Space>
      </Card>
      <Card className={styles.card}>
        <h3>Items to transfer</h3>
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
                const result = await Promise.all(
                  data.map(async (item) => {
                    const searchProduct = await client.query({
                      query: SEARCH_PRODUCT,
                      variables: { query: item[0] },
                    });
                    const { name } = searchProduct.data.searchProduct[0] || '';
                    return {
                      id: item[0],
                      name,
                      amount: parseInt(item[1], 10),
                    };
                  })
                );
                const notFound = result.filter((item) => !item.name);
                if (notFound.length !== 0) {
                  setError(
                    notFound.map((item) => ({
                      id: item.id,
                      message: 'product not found',
                    }))
                  );
                  message.error('item not found, check log');
                } else {
                  transfer.set((prev) => [...prev, ...result]);
                }
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
    </>
  );
}
