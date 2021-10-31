import React from 'react';
import { Card, Divider, Button, Space, message } from 'antd';
import WarehouseSelector from 'app/components/WarehousesSelector';
import InlineProductForm from 'app/components/inlineProductForm';
import InboundListEditor from 'app/components/InboundListEditor';
import ExcelInput from 'app/components/ExcelInput';
import { useApolloClient } from '@apollo/client';
import { SEARCH_PRODUCT } from 'app/graph';
import ErrorLogModal from 'app/components/ErrorLogModal';
import styles from './index.module.css';
import useTransferPageHooks from './hooks';

export default function WarehouseTransferPage(): React.ReactElement {
  const {
    setWarehouseFrom,
    warehouseFrom,
    setWarehouseTo,
    warehouseTo,
    onAdd,
    dataList,
    setData,
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
          <WarehouseSelector
            onSelectWarehouse={(warehouseId) => setWarehouseFrom(warehouseId)}
            feature="TRANSFER"
          />
          <span>TO</span>
          <WarehouseSelector
            onSelectWarehouse={(warehouseId) => setWarehouseTo(warehouseId)}
            all
          />
        </Space>
      </Card>
      <Card className={styles.card}>
        <h3>Items to transfer</h3>
        <InlineProductForm onAdd={onAdd} />
        <Divider />
        <InboundListEditor
          setData={setData}
          dataList={dataList}
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
                  setData([...dataList, ...result]);
                }
              }}
            />
            <ErrorLogModal errors={error} />
          </Space>
          <Button
            size="large"
            type="primary"
            onClick={onSubmit}
            disabled={!warehouseTo || !warehouseFrom || dataList.length === 0}
          >
            Submit
          </Button>
        </div>
      </Card>
    </>
  );
}
