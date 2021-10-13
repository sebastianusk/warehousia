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
  const {
    error,
    loading,
    handleOk,
    handleCancel,
    onInputProductCode,
    onInputProductName,
  } = useModalAddProductHooks(setVisible);
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
          layout="horizontal"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item label="Product Code">
            <Input
              placeholder="input product code"
              onChange={onInputProductCode}
            />
          </Form.Item>
          <Form.Item label="Product Name">
            <Input
              placeholder="input product name"
              onChange={onInputProductName}
            />
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
