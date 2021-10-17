import React from 'react';
import { Form, Input, Modal } from 'antd';

interface ProductEditStockModalState {
  showEditStockModal: (
    productId: string,
    warehouseId: string,
    amount: number
  ) => void;
  contextHolder: React.ReactElement;
}

export default function useProductEditStockModal(): ProductEditStockModalState {
  const [modal, contextHolder] = Modal.useModal();
  const showEditStockModal = (
    productId: string,
    warehouseId: string,
    amount: number
  ) => {
    modal.confirm({
      title: 'Change Product Stock',
      content: (
        <Form labelCol={{ span: 10 }}>
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
