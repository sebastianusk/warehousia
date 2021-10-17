import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input } from 'antd';
import useModalEditProductHooks from './hooks';

type ModalPropsType = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  initialData: InitialDataType | undefined;
};

type InitialDataType = {
  id: string;
  name: string;
  price: number;
};

export default function ModalEditProduct({
  visible,
  setVisible,
  initialData,
}: ModalPropsType): ReactElement {
  const {
    confirmLoading,
    handleOk,
    handleCancel,
    onInputProductCode,
    onInputProductName,
    onInputProductPrice,
  } = useModalEditProductHooks(setVisible);
  return (
    <>
      <Modal
        title="Edit Product"
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
                  value={initialData?.id}
                />
              </Form.Item>
              <Form.Item label="Product Name">
                <Input
                  placeholder="input product name"
                  value={initialData?.name}
                  onChange={onInputProductName}
                />
              </Form.Item>
              <Form.Item label="Price">
                <Input
                  placeholder="input product price"
                  onChange={onInputProductPrice}
                  value={initialData?.price}
                />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
}
