import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input } from 'antd';
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
    confirmLoading,
    handleOk,
    handleCancel,
    onInputProductCode,
    onInputProductName,
    onInputProductPrice,
    onInputProductCategory,
    onInputProductStock,
  } = useModalAddProductHooks(setVisible);
  return (
    <>
      <Modal
        title="Add New Product"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {confirmLoading ? (
          <p>Loading...</p>
        ) : (
          <>
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
              <Form.Item label="Price">
                <Input
                  placeholder="input product price"
                  onChange={onInputProductPrice}
                />
              </Form.Item>
              <Form.Item label="Category">
                <Input
                  placeholder="input product's category"
                  onChange={onInputProductCategory}
                />
              </Form.Item>
              <Form.Item label="Stocks">
                <Input
                  placeholder="input product's stock"
                  onChange={onInputProductStock}
                />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
}
