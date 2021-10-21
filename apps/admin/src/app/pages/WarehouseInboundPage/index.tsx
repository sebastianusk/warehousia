import React from 'react';
import { Card, Divider, Button, Space, message } from 'antd';
import WarehouseSelector from 'app/components/WarehousesSelector';
import ExcelInput from 'app/components/ExcelInput';
import { useApolloClient } from '@apollo/client';
import { SEARCH_PRODUCT } from 'app/graph';
import styles from './index.module.css';
import InlineProductForm from '../../components/inlineProductForm';
import InboundListEditor from '../../components/InboundListEditor';
import useInboundHooks from './hooks';
import ErrorLogModal from 'app/components/ErrorLogModal';

export default function WarehouseInboundPage(): React.ReactElement {
  const {
    selectedWarehouse,
    setSelectedWarehouse,
    error,
    setError,
    dataList,
    setDataList,
    onSubmit,
    loading,
    onAdd,
  } = useInboundHooks();

  const client = useApolloClient();

  return (
    <>
      <Card className={styles.card}>
        <div className={`${styles.flexContainer}`}>
          <h2 className={styles.title}>INBOUND</h2>
          <WarehouseSelector onSelectWarehouse={setSelectedWarehouse} />
        </div>
      </Card>
      <Card className={styles.card}>
        <InlineProductForm onAdd={onAdd} />
        <Divider />
        <InboundListEditor dataList={dataList} setData={setDataList} />
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
                  setDataList([...dataList, ...result]);
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
            disabled={!selectedWarehouse || dataList.length === 0}
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
