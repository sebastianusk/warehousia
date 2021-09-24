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
  const {
    confirmLoading,
    handleOk,
    handleCancel,
    formData,
    onChangeName,
    onChangeId,
  } = useModalAddShopHooks(setVisible);
  return (
    <>
      <Modal
        title="Add New Shop"
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
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 14 }}
            >
              <Form.Item label="ID">
                <Input
                  placeholder="input ID"
                  value={formData.id}
                  onChange={onChangeId}
                />
              </Form.Item>
              <Form.Item label="Shop Name">
                <Input
                  placeholder="input Shop Name"
                  value={formData.name}
                  onChange={onChangeName}
                />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
}
