import React, { useState } from 'react';
import { Form, Button, InputNumber, AutoComplete } from 'antd';
import { SEARCH_PRODUCT } from 'app/graph';
import { Data } from 'app/components/GlobalState';
import { useLazyQuery } from '@apollo/client';
import { useForm } from 'antd/lib/form/Form';
import _ from 'lodash';
import styles from './index.module.css';

export default function InlineProductForm({
  onAdd,
}: {
  onAdd(data: Data): void;
}): React.ReactElement {
  const [getProduct, { data }] = useLazyQuery(SEARCH_PRODUCT, {
    fetchPolicy: 'no-cache',
  });
  const [form] = useForm();
  const emptyStateSelected = {
    id: '',
    name: '',
    amount: 0,
    price: 0,
    stocks: [
      {
        warehouseId: '',
        amount: 0,
      },
    ],
  }
  const [selectedProduct, setSelectedProduct] = useState(emptyStateSelected);
  const [canSubmit, setCanSubmit] = useState(false);

  const search = _.debounce((value) => {
    setSelectedProduct(emptyStateSelected);
    getProduct({ variables: { query: value } });
  }, 250);

  const handleSelect = (value: any, options: any) => {
    setSelectedProduct(
      data?.searchProduct.find((datum: Data) => datum.id === options.key)
    );
  };

  const checkCanSubmit = (_changedValues: any, allValues: any) => {
    if (allValues.amount && allValues.product) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Form
        form={form}
        layout="inline"
        onFinish={(value: { product: string; amount: number }) => {
          form.resetFields();
          onAdd({
            ...selectedProduct,
            amount: value.amount,
          });
        }}
        onValuesChange={checkCanSubmit}
      >
        <Form.Item label="Product" name="product">
          <AutoComplete
            style={{ width: '500px' }}
            onSearch={(value) => search(value)}
            onSelect={handleSelect}
            allowClear
            placeholder="search by product name or id"
          >
            {data?.searchProduct.map((item: { id: string; name: string }) => (
              <AutoComplete.Option
                value={`${item.id} - ${item.name}`}
                key={item.id}
                dataname={item.name}
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
          <Button
            type="primary"
            htmlType="submit"
            disabled={!canSubmit || !selectedProduct.id}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
