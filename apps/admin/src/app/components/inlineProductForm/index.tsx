import React, { ReactElement } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import styles from './index.module.css';

export default function InlineProductForm(): ReactElement {
  return (
    <div className={styles.formContainer}>
      <Form layout="inline">
        <Form.Item label="Product Code">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Product Name">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Amount">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Add</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
