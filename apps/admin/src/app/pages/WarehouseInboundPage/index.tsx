import React from 'react';
import { Card, Divider, Button, Space, message } from 'antd';
import WarehouseSelector from 'app/components/WarehousesSelector';
import ExcelInput from 'app/components/ExcelInput';
import { useApolloClient } from '@apollo/client';
import { SEARCH_PRODUCT } from 'app/graph';
import ErrorLogModal from 'app/components/ErrorLogModal';
import styles from './index.module.css';
import InlineProductForm from '../../components/inlineProductForm';
import ListEditor from '../../components/ListEditor';
import useInboundHooks from './hooks';

export default function WarehouseInboundPage(): React.ReactElement {
  const {
    selectedWarehouse,
    error,
    setError,
    inbound,
    onSubmit,
    loading,
    onAdd,
  } = useInboundHooks();

  const client = useApolloClient();

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <h2 className={styles.title}>CREATE INBOUND</h2>
          <WarehouseSelector feature="INBOUND" />
        </div>
      </Card>
      <Card className={styles.card}>
        <InlineProductForm onAdd={onAdd} />
        <Divider />
        <ListEditor
          dataList={inbound.data}
          setData={inbound.set}
          selectedWarehouse={selectedWarehouse}
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
                  setError(notFound.map((item) => ({ id: item.id })));
                  message.error('item not found, check log');
                } else {
                  inbound.set((prev) => [...prev, ...result]);
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
            disabled={!selectedWarehouse || inbound.data.length === 0}
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
