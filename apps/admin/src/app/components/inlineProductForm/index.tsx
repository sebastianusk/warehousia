import React, { ReactElement } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import styles from './index.module.css';
import useInlineProductFormHooks, { DataList, Data } from './hooks';

export default function InlineProductForm({
  onAdd,
}: {
  onAdd(data: Data): void;
}): ReactElement {
  const { product, onInputProductCode, onInputAmount, onSubmit } =
    useInlineProductFormHooks(onAdd);

  return (
    <div className={styles.formContainer}>
      <Form layout="inline">
        <Form.Item label="Product Code">
          <Input
            placeholder="input product code"
            onChange={onInputProductCode}
          />
        </Form.Item>
        <Form.Item label="Product Name">
          <Input
            placeholder="input product name"
            disabled
            value={product.name}
          />
        </Form.Item>
        <Form.Item label="Amount">
          <InputNumber
            min={0}
            onChange={onInputAmount}
            value={product.amount}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onSubmit}>
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
