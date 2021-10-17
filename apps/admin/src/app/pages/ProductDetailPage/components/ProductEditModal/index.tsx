import React from 'react';
import { Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { ADD_PRODUCTS } from 'app/graph';
import { useApolloClient, useMutation } from '@apollo/client';

interface ProductEditModalProps {
  data: { id: string; name: string; price: number } ;
  onCancel: () => void;
  visible: boolean;
}

export default function ProductEditModal(
  props: ProductEditModalProps
): React.ReactElement {
  const client = useApolloClient();
  const { data, onCancel, visible } = props;
  const [form] = useForm();
  form.setFieldsValue({ name: data?.name, price: data?.price });
  const [editProduct, { loading }] = useMutation(ADD_PRODUCTS, {
    onCompleted: () => {
      onCancel();
      client.refetchQueries({ include: ['ProductStock', 'ProductLog'] });
    },
  });
  return (
    <Modal
      title="Edit Product"
      onCancel={onCancel}
      visible={visible}
      okButtonProps={{ loading }}
      onOk={() => {
        const values = form.getFieldsValue();
        if (data?.id)
          editProduct({
            variables: {
              input: { id: data.id, name: values.name, price: values.price },
            },
          });
      }}
    >
      <Form form={form} labelCol={{ span: 7 }}>
        <Form.Item name="id" label="Product ID" key="id">
          {data?.id}
        </Form.Item>
        <Form.Item
          name="name"
          label="Product Name"
          initialValue={data?.name}
          key="name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Product Price"
          initialValue={data?.price}
          key="price"
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
