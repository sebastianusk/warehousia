import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input, Checkbox } from 'antd';
import useModalAddWarehouseHooks from './hooks';

type ModalPropsType = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export default function ModalAddWarehouse({
  visible,
  setVisible,
}: ModalPropsType): ReactElement {
  const {
    confirmLoading,
    handleOk,
    handleCancel,
    onInputId,
    onInputName,
    featureOptions,
    onChangeFeatures,
  } = useModalAddWarehouseHooks(setVisible);
  return (
    <>
      <Modal
        title="Add New Warehouse"
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
              <Form.Item label="Warehouse ID">
                <Input placeholder="input warehouse ID" onChange={onInputId} />
              </Form.Item>
              <Form.Item label="Warehouse Name">
                <Input
                  placeholder="input warehouse name"
                  onChange={onInputName}
                />
              </Form.Item>
              <Form.Item label="Features">
                <Checkbox.Group
                  options={featureOptions}
                  onChange={onChangeFeatures}
                />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
}
