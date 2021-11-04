import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input } from 'antd';

import useModalAddShopHooks from './hooks';

type ModalProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export default function ModalAddShop({
  visible,
  setVisible,
}: ModalProps): ReactElement {
  const { form, handleOk, loading } = useModalAddShopHooks(setVisible);
  return (
    <>
      <Modal
        title="Add New Shop"
        visible={visible}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={() => setVisible(false)}
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item label="ID" name="id">
            <Input placeholder="input ID" />
          </Form.Item>
          <Form.Item label="Shop Name" name="name">
            <Input placeholder="input Shop Name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
