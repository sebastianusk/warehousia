import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input } from 'antd';
import useModalEditProductHooks from './hooks';

type ModalPropsType = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  initialData: InitialDataType;
};

type InitialDataType = {
  id: string;
  productName: string;
  productCode: string;
  price: number;
  categories: string[];
  stock: number;
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
    onInputProductCategory,
    onInputProductStock,
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
                  value={initialData.productCode}
                />
              </Form.Item>
              <Form.Item label="Product Name">
                <Input
                  placeholder="input product name"
                  value={initialData.productName}
                  onChange={onInputProductName}
                />
              </Form.Item>
              <Form.Item label="Price">
                <Input
                  placeholder="input product price"
                  onChange={onInputProductPrice}
                  value={initialData.price}
                />
              </Form.Item>
              <Form.Item label="Category">
                <Input
                  placeholder="input product's category"
                  onChange={onInputProductCategory}
                  value={initialData.categories}
                />
              </Form.Item>
              <Form.Item label="Stocks">
                <Input
                  placeholder="input product's stock"
                  onChange={onInputProductStock}
                  value={initialData.amount}
                />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
}
