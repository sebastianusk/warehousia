import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input, Checkbox, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import useModalEditWarehouseHooks from './hooks';

type ModalPropsType = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  initialData: {
    id: string;
    name: string;
    active: boolean;
    features: string[];
  };
};

export default function ModalEditWarehouse({
  visible,
  setVisible,
  initialData,
}: ModalPropsType): ReactElement {
  const {
    confirmLoading,
    handleOk,
    handleCancel,
    onInputName,
    onChangeActive,
    featureOptions,
    onChangeFeatures,
    formData,
  } = useModalEditWarehouseHooks({ setVisible, initialData });
  return (
    <>
      <Modal
        title="Edit Warehouse"
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
                <Input placeholder={formData.id} disabled value={formData.id} />
              </Form.Item>
              <Form.Item label="Warehouse Name">
                <Input
                  placeholder="input warehouse name"
                  onChange={onInputName}
                  value={formData.name}
                />
              </Form.Item>
              <Form.Item label="Features">
                <Checkbox.Group
                  options={featureOptions}
                  onChange={onChangeFeatures}
                  value={formData.features}
                />
              </Form.Item>
              <Form.Item label="Status">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  checked={formData.active}
                  onChange={onChangeActive}
                />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
}
