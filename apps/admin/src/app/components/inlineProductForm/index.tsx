import React, { ReactElement } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import styles from './index.module.css';
import useInlineProductFormHooks from './hooks';

export default function InlineProductForm(): ReactElement {
  const { productName, amount, onInputProductCode, onInputAmount, onSubmit } =
    useInlineProductFormHooks();

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
            value={productName}
          />
        </Form.Item>
        <Form.Item label="Amount">
          <InputNumber min={0} onChange={onInputAmount} value={amount} />
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
