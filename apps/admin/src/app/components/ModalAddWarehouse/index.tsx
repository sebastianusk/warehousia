import React, { Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input, Checkbox } from 'antd';
import useModalAddWarehouseHooks from './hooks';

type ModalPropsType = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export default function ModalAddWarehouse({
  visible,
  setVisible,
}: ModalPropsType): React.ReactElement {
  const { form, loading, handleOk } = useModalAddWarehouseHooks(setVisible);
  const featureOptions = [
    { label: 'Outbound', value: 'OUTBOUND' },
    { label: 'Inbound', value: 'INBOUND' },
    { label: 'Transfer', value: 'TRANSFER' },
  ];
  return (
    <>
      <Modal
        title="Add New Warehouse"
        visible={visible}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={() => setVisible(false)}
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item label="Warehouse ID" name="id">
            <Input placeholder="input warehouse ID" />
          </Form.Item>
          <Form.Item label="Warehouse Name" name="name">
            <Input placeholder="input warehouse name" />
          </Form.Item>
          <Form.Item label="Features" name="features">
            <Checkbox.Group options={featureOptions} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
