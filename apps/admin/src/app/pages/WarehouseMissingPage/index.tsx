import React, { ReactElement } from 'react';
import { Card, Button, Form, InputNumber, AutoComplete } from 'antd';
import WarehouseSelector from 'app/components/WarehousesSelector';
import PreparationsSelector from 'app/components/PreparationsSelector';
import useMissingHooks from './hooks';
import styles from './index.module.css';

export default function WarehouseMissingPage(): ReactElement {
  const {
    selectedWarehouse,
    onSelectWarehouse,
    dataSource,
    selectedPrep,
    onSelectPreparation,
    loading,
    onSubmit,
    form,
    onProductSelect,
  } = useMissingHooks();

  return (
    <>
      <Card className={styles.card}>
        <div>
          <h2 className={styles.title}>MISSING ITEM FORM</h2>
          <div className={styles.flexContainer}>
            <div className={styles.selectContainer}>
              <div>Warehouse ID:</div>
              <WarehouseSelector onSelectWarehouse={onSelectWarehouse} />
            </div>
            <div className={styles.selectContainer}>
              <div>Preparation ID:</div>
              <PreparationsSelector
                onSelectPrep={onSelectPreparation}
                dataSource={dataSource}
              />
            </div>
          </div>
        </div>
        {selectedWarehouse && selectedPrep && (
          <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
            onFinish={onSubmit}
          >
            <Form.Item
              name="productId"
              label="Product Id"
              rules={[{ required: true, message: 'Pilih Product ID' }]}
            >
              <AutoComplete
                style={{ width: '500px' }}
                allowClear
                onSelect={onProductSelect}
              >
                {selectedPrep.items.map((item) => (
                  <AutoComplete.Option
                    value={item.productId}
                    key={item.productId}
                  >
                    {item.productId}
                  </AutoComplete.Option>
                ))}
              </AutoComplete>
            </Form.Item>
            <Form.Item name="expected" label="Expected Amount">
              <InputNumber disabled />
            </Form.Item>
            <Form.Item name="prevMissed" label="Missing So Far">
              <InputNumber disabled />
            </Form.Item>
            <Form.Item
              name="amount"
              label="Missing Amount"
              dependencies={['actual']}
              hasFeedback
              rules={[
                { required: true, message: 'Masukan jumlah yang hilang' },
                ({ getFieldValue }) => ({
                  validator(_: any, value: any) {
                    if (!value || getFieldValue('actual') >= value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'Jumlah yang hilang tidak bisa lebih dari expected'
                      )
                    );
                  },
                }),
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button
                htmlType="submit"
                type="primary"
                loading={loading}
                disabled={!selectedWarehouse || !selectedPrep}
              >
                SUBMIT
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </>
  );
}
