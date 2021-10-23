import React, { ReactElement } from 'react';
import { Card, Button, Select, Form, Input, InputNumber } from 'antd';
import WarehouseSelector from 'app/components/WarehousesSelector';
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
  } = useMissingHooks();

  return (
    <>
      <Card className={styles.card}>
        <div>
          <h2 className={styles.title}>MISSING FORM</h2>
          <div className={styles.flexContainer}>
            <div className={styles.selectContainer}>
              <div>Warehouse ID:</div>
              <WarehouseSelector onSelectWarehouse={onSelectWarehouse} />
            </div>
            <div className={styles.selectContainer}>
              <div>Preparation ID:</div>
              <Select className={styles.select} onChange={onSelectPreparation}>
                {dataSource?.map((item: any) => (
                  <Select.Option
                    value={item.id}
                    key={item.id}
                  >{`${item.id}`}</Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
          onFinish={onSubmit}
        >
          <Form.Item
            name="productId"
            label="Product Id"
            rules={[{ required: true, message: 'Masukan Product ID' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="expected" label="Expected Amount">
            <InputNumber disabled />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Missing Amount"
            dependencies={['expected']}
            hasFeedback
            rules={[
              { required: true, message: 'Masukan jumlah yang hilang' },
              ({ getFieldValue }) => ({
                validator(_: any, value: any) {
                  if (!value || getFieldValue('expected') >= value) {
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
      </Card>
    </>
  );
}
