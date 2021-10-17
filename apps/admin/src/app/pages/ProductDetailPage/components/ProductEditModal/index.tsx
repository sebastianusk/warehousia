import React from 'react';
import { Button, Form, Input, Modal } from 'antd';

interface ProductEditModalProps {
  data: { id: string; name: string; price: number };
  onCancel: () => void;
  visible: boolean;
}

export default function ProductEditModal(
  props: ProductEditModalProps
): React.ReactElement {
  const { data, onCancel, visible } = props;
  return (
    <Modal title="Edit Product" onCancel={onCancel} visible={visible}>
      <Form labelCol={{ span: 7 }}>
        <Form.Item name="id" label="Product ID">
          {data.id}
        </Form.Item>
        <Form.Item name="name" label="Product Name">
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Product Price">
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
