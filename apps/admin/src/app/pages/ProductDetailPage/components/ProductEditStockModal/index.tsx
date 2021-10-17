import React from 'react';
import { Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { UPDATE_PRODUCT_STOCK } from 'app/graph';
import { useApolloClient, useMutation } from '@apollo/client';

interface ProductEditStockModalState {
  showEditStockModal: (
    productId: string,
    warehouseId: string,
    amount: number
  ) => void;
  contextHolder: React.ReactElement;
}

export default function useProductEditStockModal(): ProductEditStockModalState {
  const client = useApolloClient();
  const [modal, contextHolder] = Modal.useModal();
  const [form] = useForm();
  const [updateStock, { loading }] = useMutation(UPDATE_PRODUCT_STOCK, {
    onCompleted: () => {
      client.refetchQueries({ include: ['ProductStock', 'ProductLog'] });
    },
  });
  const showEditStockModal = (
    productId: string,
    warehouseId: string,
    amount: number
  ) => {
    modal.confirm({
      title: 'Change Product Stock',
      okButtonProps: { loading },
      onOk: (close: () => void) => {
        const values = form.getFieldsValue();
        updateStock({
          variables: {
            input: {
              id: productId,
              warehouse: warehouseId,
              stock: parseInt(values.amount, 10),
            },
          },
          onCompleted: () => {
            close();
          },
        });
      },
      content: (
        <Form labelCol={{ span: 10 }} form={form}>
          <Form.Item name="productId" label="Product ID" key="productId">
            {productId}
          </Form.Item>
          <Form.Item name="warehouseId" label="Warehouse ID" key="warehouseId">
            {warehouseId}
          </Form.Item>
          <Form.Item
            name="amount"
            label="Stock"
            key="amount"
            initialValue={amount}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      ),
    });
  };
  return { contextHolder, showEditStockModal };
}
