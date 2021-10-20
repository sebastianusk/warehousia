import React from 'react';
import { Form, Button, InputNumber, AutoComplete } from 'antd';
import { SEARCH_PRODUCT } from 'app/graph';
import { useLazyQuery } from '@apollo/client';
import { useForm } from 'antd/lib/form/Form';
import styles from './index.module.css';

export default function InlineProductForm({
  onAdd,
}: {
  onAdd(data: { id: string; name: string; amount: number }): void;
}): React.ReactElement {
  const [getProduct, { data }] = useLazyQuery(SEARCH_PRODUCT);
  const [form] = useForm();
  return (
    <div className={styles.formContainer}>
      <Form
        form={form}
        layout="inline"
        onFinish={(value: { product: string; amount: number }) => {
          form.resetFields();
          onAdd({
            id: value.product.split('-')[0],
            name: value.product.split('-')[1],
            amount: value.amount,
          });
        }}
      >
        <Form.Item label="Product Code" name="product">
          <AutoComplete
            style={{ width: '500px' }}
            onSearch={(value) => {
              getProduct({ variables: { query: value } });
            }}
            allowClear
          >
            {data?.searchProduct.map((item: { id: string; name: string }) => (
              <AutoComplete.Option
                value={`${item.id} - ${item.name}`}
                key={item.id}
              >
                {`${item.id} - ${item.name}`}
              </AutoComplete.Option>
            ))}
          </AutoComplete>
        </Form.Item>
        <Form.Item label="Amount" name="amount">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
