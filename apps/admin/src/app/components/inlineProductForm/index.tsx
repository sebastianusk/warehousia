import React from 'react';
import { Form, Button, InputNumber, AutoComplete } from 'antd';
import { SEARCH_PRODUCT } from 'app/graph';
import { useLazyQuery } from '@apollo/client';
import { useForm } from 'antd/lib/form/Form';
import _ from 'lodash';
import styles from './index.module.css';

export default function InlineProductForm({
  onAdd,
}: {
  onAdd(data: { id: string; name: string; amount: number }): void;
}): React.ReactElement {
  const [getProduct, { data }] = useLazyQuery(SEARCH_PRODUCT, {
    fetchPolicy: 'no-cache',
  });
  const [form] = useForm();
  const search = _.debounce((value) => {
    getProduct({ variables: { query: value } });
  }, 250);
  return (
    <div className={styles.formContainer}>
      <Form
        form={form}
        layout="inline"
        onFinish={(value: { product: string; amount: number }) => {
          form.resetFields();
          onAdd({
            id: value.product.split('-')[0].trim(),
            name: value.product.split('-')[1].trim(),
            amount: value.amount,
          });
        }}
      >
        <Form.Item label="Product" name="product">
          <AutoComplete
            style={{ width: '500px' }}
            onSearch={(value) => search(value)}
            allowClear
            placeholder="search by product name or id"
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
