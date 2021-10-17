import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input, Row, Col, Alert } from 'antd';
import useModalAddProductHooks from './hooks';

type ModalPropsType = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export default function ModalAddProduct({
  visible,
  setVisible,
}: ModalPropsType): ReactElement {
  const { form, error, loading, handleOk, handleCancel } =
    useModalAddProductHooks(setVisible);
  return (
    <>
      <Modal
        title="Add New Product"
        visible={visible}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item label="Product Code" name="id">
            <Input placeholder="input product code" />
          </Form.Item>
          <Form.Item label="Product Name" name="name">
            <Input placeholder="input product name" />
          </Form.Item>
          <Form.Item label="Product Price" name="price">
            <Input placeholder="input product price" type="number" />
          </Form.Item>
        </Form>
        {error && (
          <Row>
            <Col span="24">
              <Alert message={error.message} type="warning" />
            </Col>
          </Row>
        )}
      </Modal>
    </>
  );
}
